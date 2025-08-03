import { ChatMessage } from '@/types';

// Database Models

export interface ContactInfo {
  email: string;
  phone?: string;
  preferredContactTime?: string;
}

export interface GeneratedBrief {
  projectName: string;
  projectType: string;
  company?: string;
  industry?: string;
  businessContext: {
    description: string;
    objective: string;
    strategicContext: string;
  };
  scopeOfWork: {
    deliverables: string[];
    technicalSpecs: {
      formats?: string[];
      dimensions?: string;
      resolution?: string;
      frameRate?: string;
      duration?: string;
      colorRequirements?: string;
      platformSpecs?: string;
    };
  };
  timeline: {
    projectStart?: string;
    firstPresentation?: string;
    feedbackDue?: string;
    revisionDeadline?: string;
    finalDelivery: string;
  };
  budget: {
    clientRange: string;
    recommendedValue?: string;
    justification?: string;
    paymentSchedule?: string;
    additionalCosts?: string[];
  };
  creativeDirection: {
    style?: string;
    colorPalette?: string;
    typography?: string;
    mood?: string;
    references?: string[];
  };
  targetAudience?: {
    primary: string;
    secondary?: string;
    behavior?: string;
  };
  revisionProcess?: {
    concepts?: string;
    rounds?: string;
    feedbackTimeline?: string;
  };
  additionalNotes?: string;
}

export interface ConversationDocument {
  id: string;
  userId?: string; // Partition key
  messages: ChatMessage[];
  brief?: GeneratedBrief;
  contactInfo?: ContactInfo;
  projectType?: string;
  budget?: string;
  timeline?: string;
  status: 'active' | 'completed' | 'contacted' | 'converted';
  language: 'en' | 'th';
  createdAt: string; // ISO string
  completedAt?: string;
  emailSentAt?: string;
  followUpAt?: string;
  metadata?: {
    source?: string;
    campaign?: string;
    referrer?: string;
  };
}

export interface UserDocument {
  id: string;
  email: string; // Partition key
  phone?: string;
  name?: string;
  company?: string;
  industry?: string;
  conversationIds: string[];
  totalBriefs: number;
  preferences?: {
    language: 'en' | 'th';
    contactMethod: 'email' | 'phone' | 'both';
  };
  createdAt: string;
  lastActiveAt: string;
  tags?: string[];
}

export interface BriefDocument {
  id: string;
  conversationId: string; // Partition key
  userId?: string;
  brief: GeneratedBrief;
  version: number;
  status: 'draft' | 'sent' | 'viewed' | 'accepted';
  emailSentTo?: string;
  emailSentAt?: string;
  viewedAt?: string;
  acceptedAt?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string; // For temporary access links
}