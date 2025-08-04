// Interview Questions Module - Handles the 7-step interview process
export const INTERVIEW_PROMPT = `## Streamlined 7-Step Interview Process

### Step 1: Project Type Discovery
**Ask:** "What type of creative project do you need?"

Present these options:
1. Logo or branding design
2. Website development 
3. Video production
4. Marketing materials (flyers, social media, etc.)
5. Product design
6. Something else (please describe)

*Wait for response, then proceed to Step 2*

### Step 2: Business Context
**Ask:** "Tell me briefly about your business and what this project will help you achieve."

*This is an open-ended question to understand their business and project goals in one response.*

*Wait for response, then proceed to Step 3*

### Step 3: Budget Range
**Ask:** "What's your budget range for this project?"

Present these options:
1. Under 15,000 THB
2. 15,000 - 50,000 THB  
3. 50,000 - 100,000 THB
4. Over 100,000 THB
5. I need help determining a fair budget

*Note: If project requirements suggest a higher budget is needed, you can propose this in the final brief with justification.*

*Wait for response, then proceed to Step 4*

### Step 4: Timeline
**Ask:** "When do you need this completed?"

Present these options:
1. Rush job (1-2 weeks) - premium pricing may apply
2. Standard timeline (3-4 weeks) 
3. Flexible timing (4-6 weeks) - best value
4. I need guidance on realistic timeline

*Wait for response, then proceed to Step 5*

### Step 5: Core Project Requirements (ONE question per project type)

#### For Logo/Branding:
**Ask:** "Where will you primarily use this logo?"

Present these options:
1. Digital only (website, social media)
2. Print materials (business cards, signage)
3. Both digital and print
4. Merchandise and products
5. All of the above

#### For Website:
**Ask:** "How many pages do you need for your website?"

Present these options:
1. Simple landing page (1 page)
2. Small business site (3-5 pages)
3. Full website (6-10 pages)
4. Large site (10+ pages)
5. I need help determining this

#### For Video:
**Ask:** "What's your ideal video length?"

Present these options:
1. Short social media video (15-60 seconds)
2. Explainer video (1-3 minutes)
3. Longer promotional video (3-5 minutes)
4. Documentary style (5+ minutes)
5. Multiple videos of different lengths

#### For Marketing Materials:
**Ask:** "What type of marketing materials do you need?"

Present these options:
1. Social media graphics only
2. Print materials (flyers, brochures)
3. Digital ads (Google, Facebook)
4. Complete campaign package
5. Mix of several types

*Wait for response, then proceed to Step 6*

### Step 6: Technical Specifications (ESSENTIAL for deliverables)

#### For Logo/Branding:
**Ask:** "What file formats will you need?"

Present these options:
1. Digital only (PNG, JPG)
2. Print ready (AI, EPS, PDF)
3. Both digital and print formats
4. Full brand package (all formats + guidelines)
5. Not sure, need professional recommendation

#### For Website:
**Ask:** "What special features do you need?"

Present these options:
1. Basic informational site only
2. E-commerce/online store
3. Booking or appointment system
4. User accounts/membership area
5. Multiple features (please specify)

#### For Video:
**Ask:** "What video format and resolution do you need?"

Present these options:
1. HD 1080p Horizontal (YouTube, websites)
2. 4K Horizontal (professional/cinema use)
3. Vertical 9:16 (TikTok, Instagram Reels)
4. Square 1:1 (Instagram posts)
5. Multiple formats for different platforms

#### For Marketing Materials:
**Ask:** "What dimensions or specifications do you need?"

Present these options:
1. Standard social media sizes
2. Print specifications (A4, A5, custom)
3. Digital display ad sizes
4. Platform-specific requirements
5. Need professional recommendations

*Wait for response, then proceed to Step 7*

### Step 7: Style Direction

**Ask:** "What style best describes your vision?"

Present these options:
1. Modern and minimalist
2. Bold and eye-catching
3. Professional and corporate
4. Creative and artistic
5. I'm open to designer's suggestions

*Wait for response*

**Then say:** "Perfect! I now have all the information needed to create your comprehensive creative brief. Let me generate this for you..."

*Generate the brief using the BRIEF_GENERATION_PROMPT*`;

// Project type definitions for reference
export const PROJECT_TYPES = {
  'logo-branding': {
    name: 'Logo or Branding Design',
    coreQuestion: {
      question: "Where will you primarily use this logo?",
      options: [
        "Digital only (website, social media)",
        "Print materials (business cards, signage)",
        "Both digital and print",
        "Merchandise and products",
        "All of the above"
      ]
    },
    technicalQuestion: {
      question: "What file formats will you need?",
      options: [
        "Digital only (PNG, JPG)",
        "Print ready (AI, EPS, PDF)",
        "Both digital and print formats",
        "Full brand package (all formats + guidelines)",
        "Not sure, need professional recommendation"
      ]
    }
  },
  'website': {
    name: 'Website Development',
    coreQuestion: {
      question: "How many pages do you need for your website?",
      options: [
        "Simple landing page (1 page)",
        "Small business site (3-5 pages)",
        "Full website (6-10 pages)",
        "Large site (10+ pages)",
        "I need help determining this"
      ]
    },
    technicalQuestion: {
      question: "What special features do you need?",
      options: [
        "Basic informational site only",
        "E-commerce/online store",
        "Booking or appointment system",
        "User accounts/membership area",
        "Multiple features (please specify)"
      ]
    }
  },
  'video-production': {
    name: 'Video Production',
    coreQuestion: {
      question: "What's your ideal video length?",
      options: [
        "Short social media video (15-60 seconds)",
        "Explainer video (1-3 minutes)",
        "Longer promotional video (3-5 minutes)",
        "Documentary style (5+ minutes)",
        "Multiple videos of different lengths"
      ]
    },
    technicalQuestion: {
      question: "What video format and resolution do you need?",
      options: [
        "HD 1080p Horizontal (YouTube, websites)",
        "4K Horizontal (professional/cinema use)",
        "Vertical 9:16 (TikTok, Instagram Reels)",
        "Square 1:1 (Instagram posts)",
        "Multiple formats for different platforms"
      ]
    }
  },
  'marketing-materials': {
    name: 'Marketing Materials',
    coreQuestion: {
      question: "What type of marketing materials do you need?",
      options: [
        "Social media graphics only",
        "Print materials (flyers, brochures)",
        "Digital ads (Google, Facebook)",
        "Complete campaign package",
        "Mix of several types"
      ]
    },
    technicalQuestion: {
      question: "What dimensions or specifications do you need?",
      options: [
        "Standard social media sizes",
        "Print specifications (A4, A5, custom)",
        "Digital display ad sizes",
        "Platform-specific requirements",
        "Need professional recommendations"
      ]
    }
  }
};

export const TIMELINE_OPTIONS = [
  "Rush job (1-2 weeks) - premium pricing may apply",
  "Standard timeline (3-4 weeks)",
  "Flexible timing (4-6 weeks) - best value",
  "I need guidance on realistic timeline"
];

export const BUDGET_OPTIONS = [
  "Under 15,000 THB",
  "15,000 - 50,000 THB",
  "50,000 - 100,000 THB",
  "Over 100,000 THB",
  "I need help determining a fair budget"
];

export const STYLE_OPTIONS = [
  "Modern and minimalist",
  "Bold and eye-catching",
  "Professional and corporate",
  "Creative and artistic",
  "I'm open to designer's suggestions"
];