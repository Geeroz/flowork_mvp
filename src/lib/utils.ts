import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function extractProjectType(prompt: string): string | undefined {
  const projectTypes = {
    'brand': 'brand-identity',
    'logo': 'brand-identity',
    'website': 'website',
    'web': 'website',
    'app': 'mobile-app',
    'mobile': 'mobile-app',
    'marketing': 'marketing-campaign',
    'campaign': 'marketing-campaign',
    'video': 'video-production',
    'social': 'social-media',
    'print': 'print-design',
  };

  const lowerPrompt = prompt.toLowerCase();
  
  for (const [keyword, type] of Object.entries(projectTypes)) {
    if (lowerPrompt.includes(keyword)) {
      return type;
    }
  }
  
  return undefined;
}