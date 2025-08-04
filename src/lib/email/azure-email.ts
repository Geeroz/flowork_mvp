import { EmailClient, EmailMessage } from '@azure/communication-email';
import { GeneratedBrief, ContactInfo } from '@/lib/db/models';
import { generateHTMLBrief } from '@/lib/templates/html-brief-template';

// Validate environment variables and initialize client
let emailClient: EmailClient | null = null;
let senderAddress = '';
let initializationError: string | null = null;

// Enhanced validation and initialization
function initializeEmailClient() {
  try {
    if (process.env.AZURE_COMMUNICATION_CONNECTION_STRING) {
      console.log('Initializing Azure Email Client with connection string...');
      emailClient = new EmailClient(process.env.AZURE_COMMUNICATION_CONNECTION_STRING);
      senderAddress = process.env.AZURE_COMMUNICATION_SENDER_EMAIL || 'DoNotReply@flowork.azurecomm.net';
      console.log(`Email client initialized with sender address: ${senderAddress}`);
    } else if (process.env.AZURE_COMMUNICATION_KEY && process.env.AZURE_COMMUNICATION_EMAIL_ENDPOINT) {
      console.log('Initializing Azure Email Client with key and endpoint...');
      emailClient = new EmailClient(process.env.AZURE_COMMUNICATION_EMAIL_ENDPOINT, {
        key: process.env.AZURE_COMMUNICATION_KEY
      } as { key: string });
      senderAddress = process.env.AZURE_COMMUNICATION_SENDER_EMAIL || 'DoNotReply@flowork.azurecomm.net';
      console.log(`Email client initialized with sender address: ${senderAddress}`);
    } else {
      const missingVars = [];
      if (!process.env.AZURE_COMMUNICATION_CONNECTION_STRING) {
        missingVars.push('AZURE_COMMUNICATION_CONNECTION_STRING');
      }
      if (!process.env.AZURE_COMMUNICATION_KEY) {
        missingVars.push('AZURE_COMMUNICATION_KEY');
      }
      if (!process.env.AZURE_COMMUNICATION_EMAIL_ENDPOINT) {
        missingVars.push('AZURE_COMMUNICATION_EMAIL_ENDPOINT');
      }
      
      initializationError = `Azure Communication Services not configured. Missing environment variables: ${missingVars.join(', ')}`;
      console.error(initializationError);
    }

    // Validate sender address format
    if (senderAddress && !isValidEmailAddress(senderAddress)) {
      initializationError = `Invalid sender email address format: ${senderAddress}`;
      console.error(initializationError);
      emailClient = null;
    }
  } catch (error) {
    initializationError = `Failed to initialize Azure Email Client: ${error instanceof Error ? error.message : 'Unknown error'}`;
    console.error(initializationError, error);
    emailClient = null;
  }
}

// Email validation helper
function isValidEmailAddress(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Initialize on module load
initializeEmailClient();

// Retry configuration
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  timeout: 30000,  // 30 seconds for polling
};

// Sleep utility for delays
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Calculate exponential backoff delay
function calculateDelay(attempt: number): number {
  const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
}

// Email sending function with retry logic and timeout handling
export async function sendBriefEmail(
  contactInfo: ContactInfo,
  brief: GeneratedBrief,
  conversationId: string
): Promise<{ messageId: string; status: string }> {
  // Enhanced validation with detailed error messages
  if (!emailClient) {
    const errorMsg = initializationError || 'Email client not initialized - missing Azure Communication Services configuration';
    console.error('Email client validation failed:', errorMsg);
    throw new Error(`Email service not configured: ${errorMsg}`);
  }

  // Validate contact email
  if (!contactInfo.email || !isValidEmailAddress(contactInfo.email)) {
    throw new Error(`Invalid recipient email address: ${contactInfo.email}`);
  }

  // Validate sender address
  if (!senderAddress || !isValidEmailAddress(senderAddress)) {
    throw new Error(`Invalid sender email address: ${senderAddress}`);
  }

  let lastError: Error | unknown;
  
  for (let attempt = 0; attempt <= RETRY_CONFIG.maxRetries; attempt++) {
    try {
      console.log(`Email send attempt ${attempt + 1}/${RETRY_CONFIG.maxRetries + 1} for conversation ${conversationId}`);
      
      // Generate email content using the professional HTML template
      const htmlContent = generateEmailWithBrief(brief, conversationId);
      const plainTextContent = generateBriefEmailPlainText(brief);

      const emailMessage: EmailMessage = {
        senderAddress,
        recipients: {
          to: [{ address: contactInfo.email }],
        },
        content: {
          subject: `Your ${brief.projectType} Project Brief - FLOWORK`,
          html: htmlContent,
          plainText: plainTextContent,
        },
      };

      console.log(`Sending email to ${contactInfo.email} with subject: ${emailMessage.content.subject}`);

      // Send email with timeout
      const poller = await emailClient.beginSend(emailMessage);
      
      // Add timeout to polling operation
      const result = await Promise.race([
        poller.pollUntilDone(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Email polling timeout')), RETRY_CONFIG.timeout)
        )
      ]) as { id: string; status: string };

      console.log(`Email sent successfully on attempt ${attempt + 1}. Message ID: ${result.id}, Status: ${result.status}`);

      return {
        messageId: result.id,
        status: result.status,
      };
    } catch (error) {
      lastError = error;
      console.error(`Email send attempt ${attempt + 1} failed:`, error);

      // Don't retry on certain errors
      if (error instanceof Error) {
        if (error.message.includes('Email service not configured') ||
            error.message.includes('Invalid email address') ||
            error.message.includes('Authentication failed')) {
          console.error('Non-retryable error encountered, not retrying:', error.message);
          throw error;
        }
      }

      // Don't wait after the last attempt
      if (attempt < RETRY_CONFIG.maxRetries) {
        const delay = calculateDelay(attempt);
        console.log(`Waiting ${delay}ms before retry...`);
        await sleep(delay);
      }
    }
  }

  // All retries exhausted
  console.error(`All ${RETRY_CONFIG.maxRetries + 1} email send attempts failed for conversation ${conversationId}`);
  throw lastError || new Error('Email sending failed after all retries');
}

// Generate email with HTML brief content
function generateEmailWithBrief(brief: GeneratedBrief, conversationId: string): string {
  const briefHtml = generateHTMLBrief(brief);
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your ${brief.projectType} Project Brief - FLOWORK</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <!-- Email Header -->
    <div style="background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%); padding: 20px; text-align: center;">
        <div style="color: #38bdf8; font-size: 24px; font-weight: bold; margin-bottom: 8px;">FLOWORK</div>
        <div style="color: white; font-size: 18px;">Your Creative Brief is Ready!</div>
    </div>
    
    <!-- Brief Content -->
    <div style="max-width: 800px; margin: 0 auto; background: white;">
        ${briefHtml}
    </div>
    
    <!-- Email Footer -->
    <div style="background-color: #f8fafc; padding: 30px; text-align: center; color: #64748b; font-size: 14px;">
        <p><strong style="color: #38bdf8;">FLOWORK</strong> - Thailand's Premium Creative Talent Marketplace</p>
        <p>Our Project Manager will contact you within 24 hours to discuss next steps.</p>
        <div style="margin: 20px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/brief/${conversationId}" 
               style="display: inline-block; background: #38bdf8; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">
                View Full Brief Online
            </a>
        </div>
        <p style="margin-top: 20px; color: #94a3b8; font-size: 12px;">
            Questions? Reply to this email or visit our website for support.
        </p>
    </div>
</body>
</html>`;
}

// Legacy HTML email content (keeping for fallback)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateBriefEmailHtml(brief: GeneratedBrief, conversationId: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${brief.projectType} Project Brief</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo {
            font-size: 32px;
            font-weight: bold;
            color: #0ea5e9;
            margin-bottom: 10px;
        }
        h1 {
            color: #1a1a1a;
            font-size: 28px;
            margin-bottom: 10px;
        }
        h2 {
            color: #0ea5e9;
            font-size: 20px;
            margin-top: 30px;
            margin-bottom: 15px;
            border-bottom: 2px solid #0ea5e9;
            padding-bottom: 5px;
        }
        .section {
            margin-bottom: 30px;
        }
        .label {
            font-weight: bold;
            color: #666;
        }
        .value {
            color: #333;
            margin-left: 10px;
        }
        .cta {
            background-color: #0ea5e9;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
        ul {
            margin: 10px 0;
            padding-left: 20px;
        }
        .highlight {
            background-color: #fef3c7;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">FLOWORK</div>
            <h1>Your ${brief.projectType} Project Brief</h1>
            <p style="color: #666;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="section">
            <h2>Project Overview</h2>
            <p><span class="label">Project Type:</span><span class="value">${brief.projectType}</span></p>
            ${brief.company ? `<p><span class="label">Company:</span><span class="value">${brief.company}</span></p>` : ''}
            ${brief.industry ? `<p><span class="label">Industry:</span><span class="value">${brief.industry}</span></p>` : ''}
        </div>

        <div class="section">
            <h2>Business Context</h2>
            <p><strong>Description:</strong> ${brief.businessContext.description}</p>
            <p><strong>Objective:</strong> ${brief.businessContext.objective}</p>
            <p><strong>Strategic Context:</strong> ${brief.businessContext.strategicContext}</p>
        </div>

        <div class="section">
            <h2>Scope of Work</h2>
            <p><strong>Deliverables:</strong></p>
            <ul>
                ${brief.scopeOfWork.deliverables.map(d => `<li>${d}</li>`).join('')}
            </ul>
            ${Object.keys(brief.scopeOfWork.technicalSpecs).length > 0 ? `
            <p><strong>Technical Specifications:</strong></p>
            <ul>
                ${Object.entries(brief.scopeOfWork.technicalSpecs)
                  .filter(([, value]) => value)
                  .map(([key, value]) => `<li>${formatTechSpecLabel(key)}: ${value}</li>`)
                  .join('')}
            </ul>
            ` : ''}
        </div>

        <div class="section">
            <h2>Timeline</h2>
            <p><span class="label">Final Delivery:</span><span class="value">${brief.timeline.finalDelivery}</span></p>
            ${brief.timeline.projectStart ? `<p><span class="label">Project Start:</span><span class="value">${brief.timeline.projectStart}</span></p>` : ''}
        </div>

        <div class="section highlight">
            <h2>Budget & Investment</h2>
            <p><span class="label">Your Budget Range:</span><span class="value">${brief.budget.clientRange}</span></p>
            ${brief.budget.recommendedValue ? `<p><span class="label">Recommended Investment:</span><span class="value">${brief.budget.recommendedValue}</span></p>` : ''}
            ${brief.budget.justification ? `<p><strong>Recommendation Rationale:</strong> ${brief.budget.justification}</p>` : ''}
        </div>

        <div style="text-align: center; margin: 40px 0;">
            <p style="font-size: 18px; color: #666;">Ready to bring your project to life?</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/brief/${conversationId}" class="cta">View Full Brief Online</a>
            <p style="font-size: 14px; color: #999; margin-top: 10px;">Our Project Manager will contact you within 24 hours</p>
        </div>

        <div class="footer">
            <p>This brief was generated through FLOWORK's AI-powered discovery process.</p>
            <p>Questions? Reply to this email or call us at +66 XX XXX XXXX</p>
            <p>&copy; ${new Date().getFullYear()} FLOWORK - Thailand's Premium Creative Talent Marketplace</p>
        </div>
    </div>
</body>
</html>
  `;
}

// Generate plain text email content
function generateBriefEmailPlainText(brief: GeneratedBrief): string {
  return `
FLOWORK - Your ${brief.projectType} Project Brief

Generated on: ${new Date().toLocaleDateString()}

PROJECT OVERVIEW
================
Project Type: ${brief.projectType}
${brief.company ? `Company: ${brief.company}` : ''}
${brief.industry ? `Industry: ${brief.industry}` : ''}

BUSINESS CONTEXT
================
Description: ${brief.businessContext.description}
Objective: ${brief.businessContext.objective}
Strategic Context: ${brief.businessContext.strategicContext}

SCOPE OF WORK
=============
Deliverables:
${brief.scopeOfWork.deliverables.map(d => `- ${d}`).join('\n')}

${Object.keys(brief.scopeOfWork.technicalSpecs).length > 0 ? `
Technical Specifications:
${Object.entries(brief.scopeOfWork.technicalSpecs)
  .filter(([, value]) => value)
  .map(([key, value]) => `- ${formatTechSpecLabel(key)}: ${value}`)
  .join('\n')}
` : ''}

TIMELINE
========
Final Delivery: ${brief.timeline.finalDelivery}
${brief.timeline.projectStart ? `Project Start: ${brief.timeline.projectStart}` : ''}

BUDGET & INVESTMENT
===================
Your Budget Range: ${brief.budget.clientRange}
${brief.budget.recommendedValue ? `Recommended Investment: ${brief.budget.recommendedValue}` : ''}
${brief.budget.justification ? `\nRecommendation Rationale: ${brief.budget.justification}` : ''}

---

Ready to bring your project to life?
Our Project Manager will contact you within 24 hours.

View your full brief online: ${process.env.NEXT_PUBLIC_APP_URL}/brief/[id]

Questions? Reply to this email or call us at +66 XX XXX XXXX

© ${new Date().getFullYear()} FLOWORK - Thailand's Premium Creative Talent Marketplace
  `;
}

// Helper function to format technical spec labels
function formatTechSpecLabel(key: string): string {
  const labelMap: Record<string, string> = {
    formats: 'File Formats',
    dimensions: 'Dimensions/Orientation',
    resolution: 'Resolution',
    frameRate: 'Frame Rate',
    duration: 'Duration',
    colorRequirements: 'Color Requirements',
    platformSpecs: 'Platform Specifications',
  };
  return labelMap[key] || key;
}