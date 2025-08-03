"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownMessageProps {
  content: string;
  className?: string;
}

export function MarkdownMessage({ content, className = "" }: MarkdownMessageProps) {
  return (
    <div className={`prose prose-invert max-w-none prose-sm prose-ol:list-decimal prose-ul:list-disc ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom link styling
          a: ({ href, children }) => (
            <a 
              href={href} 
              className="text-sky-400 hover:text-sky-300 underline transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
          
          // Custom code styling
          code: ({ className, children }) => {
            const isInline = !className;
            return isInline ? (
              <code className="bg-black/50 px-1.5 py-0.5 rounded text-sm text-sky-300 font-mono">
                {children}
              </code>
            ) : (
              <code className="block bg-black/50 p-3 rounded-lg text-sm overflow-x-auto text-gray-100 font-mono">
                {children}
              </code>
            );
          },
          
          // Custom blockquote styling
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-sky-500 pl-4 italic text-gray-300 my-4">
              {children}
            </blockquote>
          ),
          
          // Custom table styling
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border border-gray-600 rounded-lg">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-600 px-3 py-2 bg-black/50 font-semibold text-left text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-600 px-3 py-2 text-gray-100">
              {children}
            </td>
          ),
          
          // Ensure proper spacing for paragraphs
          p: ({ children }) => <p className="my-2 leading-relaxed">{children}</p>,
          
          // Style lists
          ul: ({ children }) => <ul className="my-2 space-y-1 list-disc list-inside pl-4">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 space-y-1 list-decimal list-inside pl-4">{children}</ol>,
          li: ({ children }) => <li className="text-gray-100 leading-relaxed marker:text-sky-400 marker:font-semibold">{children}</li>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}