export const SYSTEM_PROMPT = `You are an expert Project Manager assistant for INSTANCEWORK, a premium talent marketplace specializing in creative services in Thailand. Your role is to conduct thorough project discovery interviews with clients and generate comprehensive creative briefs that ensure project success.

## Interview Process Guidelines

### Conversational Flow Structure
Conduct the interview as a natural, step-by-step conversation. Ask 1-2 questions at a time and wait for responses before proceeding. Use multiple choice options when appropriate to make it easier for clients to respond.

### Interview Steps

1. **Opening Discovery**
   Start with: "What do you need to get done, and what would success look like for your business?"

2. **Project Type Identification**
   Based on their response, identify the project type or ask for clarification with multiple choice options.

3. **Business Context**
   - Ask about their business and customers
   - Understand the problem this project solves

4. **Timeline Discovery**
   - Determine completion date and flexibility
   - Offer timeline options if unsure

5. **Budget Discussion**
   - Ask for budget range sensitively
   - Provide options if hesitant

6. **Project-Specific Questions**
   - Ask relevant follow-up questions based on project type
   - Keep questions focused and one at a time

### Response Guidelines
- Keep responses conversational and professional
- Show understanding and empathy
- Provide expert guidance when appropriate
- Use multiple choice to simplify complex questions
- Always wait for user response before proceeding

### Brief Generation
Once sufficient information is collected, generate a comprehensive brief including:
- Executive Summary
- Project Objectives
- Target Audience
- Deliverables
- Timeline
- Budget
- Success Criteria
- Special Requirements

Remember: You represent INSTANCEWORK's premium service quality. Be consultative, thorough, and professional.`;

export const PROJECT_TYPES = {
  'brand-identity': {
    name: 'Logo or Branding Design',
    questions: [
      "Do you have existing brand colors or style preferences, or are you starting completely fresh?",
      {
        question: "Where will you primarily use this logo?",
        options: [
          "Business cards and stationery",
          "Website and social media",
          "Signage and displays",
          "All of the above",
          "Other specific uses"
        ]
      },
      {
        question: "How many initial logo concepts would you like to see?",
        options: [
          "2-3 focused options (faster, more decisive)",
          "4-5 diverse options (more variety to choose from)",
          "Let the designer recommend"
        ]
      }
    ]
  },
  'website': {
    name: 'Website Development',
    questions: [
      {
        question: "How many pages do you need for your website?",
        options: [
          "Simple landing page (1 page)",
          "Small business site (3-5 pages)",
          "Full website (6-10 pages)",
          "Large site (10+ pages)",
          "I'm not sure, what do you recommend?"
        ]
      },
      {
        question: "Do you need any special features?",
        options: [
          "Contact forms",
          "E-commerce/online store",
          "User accounts/login",
          "Blog or news section",
          "Portfolio/gallery",
          "Booking system",
          "Just a simple informational site"
        ]
      },
      "Do you have existing branding (logo, colors, fonts) we should use?"
    ]
  },
  'video-production': {
    name: 'Video Production',
    questions: [
      {
        question: "What type of video do you need?",
        options: [
          "Company/brand video",
          "Product demonstration",
          "Social media content",
          "Training/educational video",
          "Event coverage",
          "Animation/motion graphics"
        ]
      },
      "How long should the final video be?",
      "Where will this video be used? (website, social media, presentations, etc.)"
    ]
  },
  'marketing-campaign': {
    name: 'Marketing Campaign',
    questions: [
      {
        question: "What marketing materials do you need?",
        options: [
          "Social media content",
          "Print materials (flyers, brochures)",
          "Digital ads",
          "Email templates",
          "Complete campaign package"
        ]
      },
      "What's your main marketing goal? (awareness, sales, engagement, etc.)",
      "Which channels will you use for this campaign?"
    ]
  }
};

export const TIMELINE_OPTIONS = [
  "Rush job (1-2 weeks) - premium pricing",
  "Standard timeline (3-4 weeks)",
  "Flexible timing (4-6 weeks) - best value",
  "I'm not sure, what do you recommend?"
];

export const BUDGET_OPTIONS = [
  "Under 15,000 THB",
  "15,000 - 50,000 THB",
  "50,000 - 100,000 THB",
  "Over 100,000 THB",
  "I need help determining a fair budget"
];