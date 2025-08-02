export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  metadata?: Record<string, unknown>;
}

export interface ProjectBrief {
  id: string;
  title: string;
  projectType: string;
  description: string;
  objectives: string[];
  targetAudience: string;
  budget: string;
  timeline: string;
  deliverables: string[];
  specialRequirements?: string;
  createdAt: Date;
  conversationId: string;
}

export interface Conversation {
  id: string;
  messages: ChatMessage[];
  status: 'active' | 'completed' | 'abandoned';
  initialPrompt: string;
  projectType?: string;
  estimatedBudget?: string;
  timeline?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  completedAt?: Date;
}

export interface User {
  id: string;
  email: string;
  createdAt: Date;
  conversations?: Conversation[];
}

export interface InterviewStep {
  id: string;
  question: string;
  type: 'text' | 'multiple-choice' | 'email';
  options?: string[];
  required: boolean;
  category: string;
}

export type ProjectType = 
  | 'brand-identity'
  | 'website'
  | 'mobile-app'
  | 'marketing-campaign'
  | 'video-production'
  | 'social-media'
  | 'print-design'
  | 'other';

export interface BriefGenerationRequest {
  conversation: Conversation;
  userEmail: string;
}