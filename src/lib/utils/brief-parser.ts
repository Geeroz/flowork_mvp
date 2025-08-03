import { ChatMessage } from '@/types';
import { GeneratedBrief, ContactInfo } from '@/lib/db/models';

// Parse the generated brief from the conversation messages
export function parseBriefFromMessages(messages: ChatMessage[]): GeneratedBrief | null {
  // Find the message containing the generated brief (usually the last assistant message with the full brief)
  const briefMessage = messages
    .filter(m => m.role === 'assistant')
    .reverse()
    .find(m => m.content.includes('# Creative Brief:') || m.content.includes('## Project Overview'));

  if (!briefMessage) {
    return null;
  }

  try {
    const content = briefMessage.content;
    
    // Extract key information from the brief
    const brief: GeneratedBrief = {
      projectName: extractValue(content, 'Project Name') || 'Untitled Project',
      projectType: extractValue(content, 'Project Type') || 'General',
      company: extractValue(content, 'Client:') || extractValue(content, 'Company:'),
      industry: extractValue(content, 'Industry:'),
      businessContext: {
        description: extractSection(content, 'Company Description:') || '',
        objective: extractSection(content, 'Project Objective:') || '',
        strategicContext: extractSection(content, 'Strategic Context:') || '',
      },
      scopeOfWork: {
        deliverables: extractListItems(content, 'Primary Deliverables:') || [],
        technicalSpecs: {
          formats: extractFormats(content, 'File formats:'),
          dimensions: extractValue(content, 'Dimensions/Orientation:'),
          resolution: extractValue(content, 'Resolution:'),
          frameRate: extractValue(content, 'Frame rate:'),
          duration: extractValue(content, 'Duration:'),
          colorRequirements: extractValue(content, 'Color requirements:'),
          platformSpecs: extractValue(content, 'Platform specifications:'),
        },
      },
      timeline: {
        projectStart: extractValue(content, 'Project Start:'),
        firstPresentation: extractValue(content, 'First Concept Presentation:'),
        feedbackDue: extractValue(content, 'Client Feedback Due:'),
        revisionDeadline: extractValue(content, 'Revision Deadline:'),
        finalDelivery: extractValue(content, 'Final Delivery:') || 'To be determined',
      },
      budget: {
        clientRange: extractValue(content, "Client's Initial Budget Range:") || 
                     extractValue(content, 'Budget Range:') || 
                     'Not specified',
        recommendedValue: extractValue(content, 'Recommended Project Value:'),
        justification: extractSection(content, 'Budget Justification:'),
        paymentSchedule: extractValue(content, 'Payment Schedule:'),
      },
      creativeDirection: {
        style: extractValue(content, 'Style Preferences:'),
        colorPalette: extractValue(content, 'Color Palette:'),
        typography: extractValue(content, 'Typography:'),
        mood: extractValue(content, 'Mood/Tone:'),
        references: extractListItems(content, 'References:'),
      },
      targetAudience: {
        primary: extractSection(content, 'Primary Audience:') || '',
        secondary: extractSection(content, 'Secondary Audience:'),
        behavior: extractSection(content, 'User Behavior:'),
      },
      additionalNotes: extractSection(content, 'Additional Notes:'),
    };

    return brief;
  } catch (error) {
    console.error('Error parsing brief:', error);
    return null;
  }
}

// Parse contact information from messages
export function parseContactInfoFromMessages(messages: ChatMessage[]): ContactInfo | null {
  // Look for messages containing email and phone
  const contactMessages = messages
    .filter(m => m.role === 'user')
    .reverse();

  let email: string | undefined;
  let phone: string | undefined;
  let preferredTime: string | undefined;

  for (const message of contactMessages) {
    const content = message.content.toLowerCase();
    
    // Extract email
    if (!email) {
      const emailMatch = message.content.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        email = emailMatch[0];
      }
    }

    // Extract phone
    if (!phone && (content.includes('phone') || content.includes('tel') || content.includes('โทร'))) {
      const phoneMatch = message.content.match(/[\d\s\-\+\(\)]+/);
      if (phoneMatch && phoneMatch[0].length >= 9) {
        phone = phoneMatch[0].trim();
      }
    }

    // Extract preferred contact time
    if (!preferredTime && (content.includes('time') || content.includes('เวลา'))) {
      preferredTime = message.content;
    }
  }

  if (!email) {
    return null;
  }

  return {
    email,
    phone,
    preferredContactTime: preferredTime,
  };
}

// Helper functions
function extractValue(content: string, label: string): string | undefined {
  const regex = new RegExp(`${label}\\s*[:\\-]?\\s*([^\\n]+)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}

function extractSection(content: string, label: string): string | undefined {
  const regex = new RegExp(`${label}\\s*[:\\-]?\\s*([^\\n]+(?:\\n(?![A-Z-]).*)*)`,'i');
  const match = content.match(regex);
  return match ? match[1].trim() : undefined;
}

function extractListItems(content: string, label: string): string[] {
  const sectionRegex = new RegExp(`${label}\\s*[:\\-]?\\s*([^\\n]+(?:\\n(?!##|\\*\\*).*)*)`,'i');
  const sectionMatch = content.match(sectionRegex);
  
  if (!sectionMatch) return [];
  
  const section = sectionMatch[1];
  const items: string[] = [];
  
  // Match bullet points or numbered lists
  const itemRegex = /^[\-\*\•\d+\.]\s*(.+)$/gm;
  let match;
  
  while ((match = itemRegex.exec(section)) !== null) {
    items.push(match[1].trim());
  }
  
  return items;
}

// Extract project type from conversation
export function extractProjectType(messages: ChatMessage[]): string {
  const projectTypes = [
    'Logo', 'Branding', 'Website', 'Video', 'Marketing', 
    'Social Media', 'Print', 'Digital', 'Campaign'
  ];
  
  for (const message of messages) {
    for (const type of projectTypes) {
      if (message.content.toLowerCase().includes(type.toLowerCase())) {
        return type;
      }
    }
  }
  
  return 'Creative Project';
}

// Extract formats as an array
function extractFormats(content: string, label: string): string[] | undefined {
  const value = extractValue(content, label);
  if (!value) return undefined;
  
  // Split by common delimiters and clean up
  return value
    .split(/[,;\\n]/)
    .map(format => format.trim())
    .filter(format => format.length > 0);
}