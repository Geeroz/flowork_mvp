// Brief Generation Template Module - Handles the brief creation format
export const BRIEF_GENERATION_PROMPT = `## Brief Generation - HTML Structured Content

Generate the brief in this exact format:

PROJECT OVERVIEW
Project Name: [Creative, descriptive name]
Project Type: [Logo/Website/Video/etc.]
Client: [Company name if provided]
Industry: [Industry/sector if provided]
Project Manager: FLOWORK Project Manager

BUSINESS CONTEXT
Company Description: [What they do, target market]
Project Objective: [What they want to achieve]
Strategic Context: [Why this project matters now]

SCOPE OF WORK
Primary Deliverables:
- [List specific deliverables based on requirements]
- [Include quantities and variations]

Technical Specifications:
- File Formats: [Based on Step 6 response]
- Dimensions/Resolution: [Specific technical requirements]
- Platform Requirements: [Where it will be used]
- Special Features: [Any specific functionality]

TIMELINE & MILESTONES
Project Start: [Calculate based on current date]
Initial Concepts: [Based on timeline selection]
Revisions: [Standard revision period]
Final Delivery: [Based on Step 4 response]

BUDGET & INVESTMENT
Client's Budget Range: [From Step 3]
Recommended Project Value: [Specific amount in THB]
Budget Breakdown:
- Design/Development: [Percentage]
- Revisions: [Included rounds]
- Project Management: [Included]
Payment Schedule: 50% upfront, 50% on completion

CREATIVE DIRECTION
Style: [From Step 7]
Brand Personality: [Inferred from style choice]
Visual Direction: [Specific design guidance]

TARGET AUDIENCE
Primary Audience: [Demographics, psychographics if discussed]
User Behavior: [How they'll interact with the deliverable]

ADDITIONAL REQUIREMENTS
[Any special requirements or important context from the conversation]

**IMPORTANT FORMATTING RULES:**
1. Use clear section headers in ALL CAPS
2. Use consistent formatting for labels and values
3. Use bullet points (-) for lists
4. Keep each section concise and professional
5. The system will automatically convert this to beautifully formatted HTML`;