import { ChatMessage } from '@/types';
import { GeneratedBrief, ContactInfo } from '@/lib/db/models';

// Parse structured brief content from AI response
export function parseBriefFromContent(content: string): GeneratedBrief | null {
  try {
    const sections = extractSections(content);
    
    if (!sections['PROJECT OVERVIEW']) {
      return null; // Not a valid brief
    }

    const projectOverview = parseProjectOverview(sections['PROJECT OVERVIEW'] || '');
    const businessContext = parseBusinessContext(sections['BUSINESS CONTEXT'] || '');
    const scopeOfWork = parseScopeOfWork(sections['SCOPE OF WORK'] || '');
    const timeline = parseTimeline(sections['TIMELINE & MILESTONES'] || '');
    const budget = parseBudget(sections['BUDGET & INVESTMENT'] || '');
    const creativeDirection = parseCreativeDirection(sections['CREATIVE DIRECTION'] || '');
    const targetAudience = parseTargetAudience(sections['TARGET AUDIENCE'] || '');
    const additionalNotes = sections['ADDITIONAL NOTES']?.trim() || undefined;

    return {
      projectName: projectOverview.projectName || 'Untitled Project',
      projectType: projectOverview.projectType || 'Creative Project',
      company: projectOverview.client,
      industry: projectOverview.industry,
      businessContext,
      scopeOfWork,
      timeline,
      budget,
      creativeDirection,
      targetAudience: targetAudience.primary ? targetAudience : undefined,
      additionalNotes
    };
  } catch (error) {
    console.error('Error parsing brief content:', error);
    return null;
  }
}

function extractSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const sectionHeaders = [
    'PROJECT OVERVIEW',
    'BUSINESS CONTEXT', 
    'SCOPE OF WORK',
    'TIMELINE & MILESTONES',
    'BUDGET & INVESTMENT',
    'CREATIVE DIRECTION',
    'TARGET AUDIENCE',
    'ADDITIONAL NOTES'
  ];

  let currentSection = '';
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim().toUpperCase();
    
    // Check if this line is a section header
    const foundHeader = sectionHeaders.find(header => trimmedLine === header);
    if (foundHeader) {
      currentSection = foundHeader;
      sections[currentSection] = '';
      continue;
    }
    
    // Add content to current section if we have one
    if (currentSection && line.trim()) {
      sections[currentSection] += line + '\n';
    }
  }
  
  return sections;
}

function parseProjectOverview(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    projectName: extractValue(lines, 'Project Name'),
    projectType: extractValue(lines, 'Project Type'),
    client: extractValue(lines, 'Client'),
    industry: extractValue(lines, 'Industry')
  };
}

function parseBusinessContext(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    description: extractValue(lines, 'Company Description') || '',
    objective: extractValue(lines, 'Project Objective') || '',
    strategicContext: extractValue(lines, 'Strategic Context') || ''
  };
}

function parseScopeOfWork(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  // Extract deliverables (items after "Primary Deliverables:")
  const deliverables: string[] = [];
  let inDeliverables = false;
  let inTechnicalSpecs = false;
  
  const technicalSpecs: Record<string, string | string[]> = {};
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed.includes('Primary Deliverables:')) {
      inDeliverables = true;
      inTechnicalSpecs = false;
      continue;
    }
    
    if (trimmed.includes('Technical Specifications:')) {
      inDeliverables = false;
      inTechnicalSpecs = true;
      continue;
    }
    
    if (inDeliverables && trimmed.startsWith('- ')) {
      deliverables.push(trimmed.substring(2));
    }
    
    if (inTechnicalSpecs && trimmed.startsWith('- ')) {
      const specLine = trimmed.substring(2);
      const colonIndex = specLine.indexOf(':');
      if (colonIndex > -1) {
        const key = specLine.substring(0, colonIndex).trim();
        const value = specLine.substring(colonIndex + 1).trim();
        
        switch (key.toLowerCase()) {
          case 'file formats':
            technicalSpecs.formats = value.split(',').map(f => f.trim());
            break;
          case 'dimensions/orientation':
          case 'dimensions':
            technicalSpecs.dimensions = value;
            break;
          case 'resolution':
            technicalSpecs.resolution = value;
            break;
          case 'frame rate':
            technicalSpecs.frameRate = value;
            break;
          case 'duration':
            technicalSpecs.duration = value;
            break;
          case 'color requirements':
            technicalSpecs.colorRequirements = value;
            break;
          case 'platform specifications':
            technicalSpecs.platformSpecs = value;
            break;
        }
      }
    }
  }
  
  return {
    deliverables,
    technicalSpecs
  };
}

function parseTimeline(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    projectStart: extractValue(lines, 'Project Start'),
    firstPresentation: extractValue(lines, 'First Concept Presentation'),
    feedbackDue: extractValue(lines, 'Client Feedback Due'),
    revisionDeadline: extractValue(lines, 'Revision Deadline'),
    finalDelivery: extractValue(lines, 'Final Delivery') || ''
  };
}

function parseBudget(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    clientRange: extractValue(lines, 'Client\'s Initial Budget Range') || 'Not specified',
    recommendedValue: extractValue(lines, 'Recommended Project Value'),
    justification: extractValue(lines, 'Budget Justification'),
    paymentSchedule: extractValue(lines, 'Payment Schedule')
  };
}

function parseCreativeDirection(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    style: extractValue(lines, 'Style Preferences'),
    colorPalette: extractValue(lines, 'Color Palette'),
    typography: extractValue(lines, 'Typography'),
    mood: extractValue(lines, 'Mood/Tone'),
    references: extractValue(lines, 'References')?.split(',').map(r => r.trim()).filter(r => r) || []
  };
}

function parseTargetAudience(content: string) {
  const lines = content.split('\n').filter(line => line.trim());
  
  return {
    primary: extractValue(lines, 'Primary Audience') || '',
    secondary: extractValue(lines, 'Secondary Audience'),
    behavior: extractValue(lines, 'User Behavior')
  };
}

function extractValue(lines: string[], key: string): string | undefined {
  for (const line of lines) {
    if (line.includes(key + ':')) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > -1) {
        return line.substring(colonIndex + 1).trim() || undefined;
      }
    }
  }
  return undefined;
}

// Parse the generated brief from the conversation messages (legacy function for backwards compatibility)
export function parseBriefFromMessages(messages: ChatMessage[]): GeneratedBrief | null {
  console.log('Parsing brief from messages:', messages.length);
  
  // Find the message containing the generated brief (usually the last assistant message with the full brief)
  const assistantMessages = messages.filter(m => m.role === 'assistant');
  console.log('Found assistant messages:', assistantMessages.length);
  
  const briefMessage = assistantMessages
    .reverse()
    .find(m => {
      const hasBriefIndicators = m.content.includes('# Creative Brief:') || 
                                m.content.includes('## Project Overview') ||
                                m.content.includes('PROJECT OVERVIEW') ||
                                m.content.includes('Perfect! Let me create your comprehensive creative brief');
      console.log('Checking message for brief indicators:', hasBriefIndicators, m.content.substring(0, 100));
      return hasBriefIndicators;
    });

  if (!briefMessage) {
    console.log('No brief message found');
    return null;
  }

  console.log('Found brief message, parsing...');

  // Try the new structured parser first
  const structuredBrief = parseBriefFromContent(briefMessage.content);
  if (structuredBrief) {
    console.log('Successfully parsed structured brief');
    return structuredBrief;
  }

  // Fall back to legacy parsing for old format
  try {
    const content = briefMessage.content;
    
    // Extract key information from the brief
    const brief: GeneratedBrief = {
      projectName: extractValueFromString(content, 'Project Name') || 'Untitled Project',
      projectType: extractValueFromString(content, 'Project Type') || 'General',
      company: extractValueFromString(content, 'Client:') || extractValueFromString(content, 'Company:'),
      industry: extractValueFromString(content, 'Industry:'),
      businessContext: {
        description: extractSection(content, 'Company Description:') || '',
        objective: extractSection(content, 'Project Objective:') || '',
        strategicContext: extractSection(content, 'Strategic Context:') || '',
      },
      scopeOfWork: {
        deliverables: extractListItems(content, 'Primary Deliverables:') || [],
        technicalSpecs: {
          formats: extractFormats(content, 'File formats:'),
          dimensions: extractValueFromString(content, 'Dimensions/Orientation:'),
          resolution: extractValueFromString(content, 'Resolution:'),
          frameRate: extractValueFromString(content, 'Frame rate:'),
          duration: extractValueFromString(content, 'Duration:'),
          colorRequirements: extractValueFromString(content, 'Color requirements:'),
          platformSpecs: extractValueFromString(content, 'Platform specifications:'),
        },
      },
      timeline: {
        projectStart: extractValueFromString(content, 'Project Start:'),
        firstPresentation: extractValueFromString(content, 'First Concept Presentation:'),
        feedbackDue: extractValueFromString(content, 'Client Feedback Due:'),
        revisionDeadline: extractValueFromString(content, 'Revision Deadline:'),
        finalDelivery: extractValueFromString(content, 'Final Delivery:') || 'To be determined',
      },
      budget: {
        clientRange: extractValueFromString(content, "Client's Initial Budget Range:") || 
                     extractValueFromString(content, 'Budget Range:') || 
                     'Not specified',
        recommendedValue: extractValueFromString(content, 'Recommended Project Value:'),
        justification: extractSection(content, 'Budget Justification:'),
        paymentSchedule: extractValueFromString(content, 'Payment Schedule:'),
      },
      creativeDirection: {
        style: extractValueFromString(content, 'Style Preferences:'),
        colorPalette: extractValueFromString(content, 'Color Palette:'),
        typography: extractValueFromString(content, 'Typography:'),
        mood: extractValueFromString(content, 'Mood/Tone:'),
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
  console.log('Parsing contact info from messages:', messages.length);
  
  // Look for messages containing email and phone
  const contactMessages = messages
    .filter(m => m.role === 'user')
    .reverse();

  let email: string | undefined;
  let phone: string | undefined;
  let preferredTime: string | undefined;

  for (const message of contactMessages) {
    const content = message.content.toLowerCase();
    const originalContent = message.content;
    
    console.log('Checking message for contact info:', originalContent);
    
    // Extract email - improved regex
    if (!email) {
      const emailMatch = originalContent.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (emailMatch) {
        email = emailMatch[0];
        console.log('Found email:', email);
      }
    }

    // Extract phone - more flexible approach
    if (!phone) {
      // Look for phone numbers without requiring specific keywords
      const phoneMatch = originalContent.match(/[\+]?[\d\s\-\(\)]{10,}/);
      if (phoneMatch && phoneMatch[0].replace(/\D/g, '').length >= 9) {
        phone = phoneMatch[0].trim();
        console.log('Found phone:', phone);
      }
    }

    // Extract preferred contact time
    if (!preferredTime && (content.includes('time') || content.includes('เวลา'))) {
      preferredTime = originalContent;
    }
  }

  console.log('Parsed contact info - Email:', email, 'Phone:', phone);

  if (!email) {
    console.log('No email found, returning null');
    return null;
  }

  return {
    email,
    phone,
    preferredContactTime: preferredTime,
  };
}

// Helper functions for legacy parsing
function extractValueFromString(content: string, label: string): string | undefined {
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
  const value = extractValueFromString(content, label);
  if (!value) return undefined;
  
  // Split by common delimiters and clean up
  return value
    .split(/[,;\\n]/)
    .map(format => format.trim())
    .filter(format => format.length > 0);
}