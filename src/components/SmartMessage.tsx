"use client";

import { parseBriefFromContent } from '@/lib/utils/brief-parser';
import { generateHTMLBrief } from '@/lib/templates/html-brief-template';
import { MarkdownMessage } from '@/components/MarkdownMessage';

interface SmartMessageProps {
  content: string;
  className?: string;
}

// Check if content appears to be a structured brief (final brief generation)
function isBriefContent(content: string): boolean {
  const briefIndicators = [
    'PROJECT OVERVIEW',
    'BUSINESS CONTEXT',
    'SCOPE OF WORK',
    'TIMELINE & MILESTONES',
    'BUDGET & INVESTMENT',
    'Project Name:',
    'Project Type:',
    'Primary Deliverables:'
  ];
  
  // Only consider it a brief if it has multiple sections (final brief generation)
  const indicatorCount = briefIndicators.filter(indicator => 
    content.toUpperCase().includes(indicator.toUpperCase())
  ).length;
  
  // Require at least 3 indicators to consider it a structured brief
  // This prevents individual questions from being treated as briefs
  return indicatorCount >= 3;
}

export function SmartMessage({ content, className = "" }: SmartMessageProps) {
  // Check if this is a final brief that should be rendered as HTML
  if (isBriefContent(content)) {
    try {
      const brief = parseBriefFromContent(content);
      if (brief) {
        const htmlBrief = generateHTMLBrief(brief);
        
        return (
          <div 
            className={`brief-content rounded-lg overflow-hidden ${className}`}
            dangerouslySetInnerHTML={{ __html: htmlBrief }}
          />
        );
      }
    } catch (error) {
      console.error('Error parsing brief content:', error);
      // Fall back to markdown rendering if HTML parsing fails
    }
  }

  // For all conversational content (questions, responses, etc.), use markdown
  // This gives us proper numbered list rendering and better formatting
  return <MarkdownMessage content={content} className={className} />;
}