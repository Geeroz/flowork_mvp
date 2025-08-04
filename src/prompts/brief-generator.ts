// Import modular prompt components
import { BASE_SYSTEM_PROMPT } from './base-prompt';
import { INTERVIEW_PROMPT, PROJECT_TYPES, TIMELINE_OPTIONS, BUDGET_OPTIONS, STYLE_OPTIONS } from './interview-questions';
import { BRIEF_GENERATION_PROMPT } from './brief-template';
import { CONTACT_COLLECTION_PROMPT } from './contact-collection';

// Combine all modules into the complete system prompt
export const SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

${INTERVIEW_PROMPT}

${BRIEF_GENERATION_PROMPT}

${CONTACT_COLLECTION_PROMPT}`;

// Re-export constants for backward compatibility
export { PROJECT_TYPES, TIMELINE_OPTIONS, BUDGET_OPTIONS, STYLE_OPTIONS };