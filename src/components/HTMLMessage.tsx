"use client";

import { parseBriefFromContent } from '@/lib/utils/brief-parser';
import { generateHTMLBrief } from '@/lib/templates/html-brief-template';

interface HTMLMessageProps {
  content: string;
  className?: string;
}

// Check if content appears to be a structured brief
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
  
  return briefIndicators.some(indicator => 
    content.toUpperCase().includes(indicator.toUpperCase())
  );
}

export function HTMLMessage({ content, className = "" }: HTMLMessageProps) {
  // Check if this is a brief content that should be rendered as HTML
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
      // Fall back to regular text rendering if parsing fails
    }
  }

  // For regular content, render as formatted text
  return (
    <div className={`prose prose-invert max-w-none prose-sm ${className}`}>
      <div className="whitespace-pre-wrap leading-relaxed text-gray-100">
        {formatRegularContent(content)}
      </div>
    </div>
  );
}

// Format regular content with basic styling
function formatRegularContent(content: string) {
  // Split content into lines and process each one
  const lines = content.split('\n');
  
  return lines.map((line, index) => {
    const trimmedLine = line.trim();
    
    // Handle numbered lists (1. 2. 3. etc.)
    if (/^\d+\.\s/.test(trimmedLine)) {
      return (
        <div key={index} className="flex items-start my-1">
          <span className="text-sky-400 font-semibold mr-2 min-w-[1.5rem]">
            {trimmedLine.match(/^\d+\./)?.[0]}
          </span>
          <span className="flex-1">
            {trimmedLine.replace(/^\d+\.\s/, '')}
          </span>
        </div>
      );
    }
    
    // Handle bullet points
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('• ')) {
      return (
        <div key={index} className="flex items-start my-1">
          <span className="text-sky-400 mr-2 min-w-[1rem]">•</span>
          <span className="flex-1">
            {trimmedLine.replace(/^[-•]\s/, '')}
          </span>
        </div>
      );
    }
    
    // Handle questions (ending with ?)
    if (trimmedLine.endsWith('?')) {
      return (
        <div key={index} className="my-2 text-sky-300 font-medium">
          {trimmedLine}
        </div>
      );
    }
    
    // Empty lines
    if (!trimmedLine) {
      return <div key={index} className="my-2"></div>;
    }
    
    // Regular paragraphs
    return (
      <div key={index} className="my-2">
        {trimmedLine}
      </div>
    );
  });
}