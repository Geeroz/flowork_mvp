# Changelog

All notable changes to the FLOWORK AI Brief Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2025-08-07

### Added
- **Navigation Bar System**
  - Fixed navbar with menu items: Flowork, About, Policy, FAQ, Freelance Register, Login
  - Mobile-responsive hamburger menu with smooth transitions
  - Transparent background with backdrop blur effect
  - Proper Next.js Link components for client-side routing

- **Enhanced Landing Page Layout**
  - Vertically centered main content area with flexbox layout
  - Pinned footer at bottom of screen with clean border separator
  - Improved responsive design for all screen sizes
  - Professional spacing and visual hierarchy

- **Unified Light Theme Design**
  - Complete neutral color palette across all components
  - Consistent `bg-neutral-50` backgrounds with `text-neutral-900` text
  - Card components using `bg-neutral-300` with subtle borders
  - Sky-500/600 accent colors for interactive elements

### Improved
- **ChatInterface Visual Consistency**
  - Updated from dark gradient theme to match landing page neutrals
  - All text colors converted to dark neutral variants
  - Message bubbles with improved contrast and readability
  - Progress indicators and status elements using consistent styling

- **Markdown Rendering**
  - All markdown text colors updated to dark neutral variants
  - Code blocks and inline code with neutral backgrounds
  - Tables, links, and blockquotes using appropriate contrast ratios
  - List markers and numbering with darker sky variants
  - Removed `prose-invert` for proper light theme compatibility

### Fixed
- **Color Consistency Issues**
  - Eliminated all remaining light text colors on light backgrounds
  - Fixed markdown styling conflicts between chat and landing pages
  - Proper contrast ratios for accessibility compliance
  - Consistent button and form element styling

### Changed
- Landing page layout from top-aligned to vertically centered
- Navigation from simple header to comprehensive navbar system
- Theme from mixed dark/light to unified neutral light theme
- Footer positioning from inline content to pinned bottom

## [1.4.0] - 2025-01-04

### Added
- **Modular System Prompt Architecture**
  - Split system prompt into 4 independent modules for better maintainability
  - `base-prompt.ts`: Core rules and language support
  - `interview-questions.ts`: Streamlined 7-step interview process
  - `brief-template.ts`: Brief generation format
  - `contact-collection.ts`: Mandatory email/phone collection
  
- **Streamlined Interview Experience**
  - Reduced interview from 9 to 7 focused steps
  - Strict one-question-at-a-time rule enforcement
  - 80%+ questions converted to multiple choice format
  - Enhanced Thai phone number parsing (0818088711 format)
  - Maintained technical specifications for clear deliverables

### Improved
- **User Experience**
  - Faster interview completion (7 vs 15+ questions previously)
  - Reduced typing with multiple choice options
  - Clear numbered list format (1. 2. 3.) for all choices
  - Simplified business context collection (1 question vs 3)
  
- **System Maintainability**
  - Modular architecture prevents breaking changes when editing one component
  - Each function (interview, brief, contact) can be updated independently
  - Enhanced debugging with detailed conversation completion logging
  - Improved contact information parsing reliability

### Fixed
- **Email Sending Issues**
  - Fixed conversation completion detection with new modular prompt
  - Added proper trigger phrases for email sending after contact collection
  - Enhanced contact parsing for Thai mobile numbers
  - Resolved issue where emails weren't sent in new prompt system

### Changed
- Interview process reduced from 9 to 7 essential steps
- UI progress indicator updated to show 7 steps instead of 10
- Contact collection now explicitly requires BOTH email AND phone number
- Technical requirements gathering maintained but streamlined

## [1.3.1] - 2025-01-04

### Added
- **Project Documentation**
  - Comprehensive CHANGELOG.md following Keep a Changelog format
  - Complete version history from MVP to current release
  - Structured documentation of all features and improvements

### Verified
- Production build compilation and optimization
- All TypeScript and ESLint validations
- Git repository synchronization and deployment readiness

## [1.3.0] - 2025-01-04

### Added
- **Comprehensive Email Reliability System**
  - Retry logic with exponential backoff for email delivery (up to 3 attempts)
  - Timeout handling for Azure email poller operations (30-second timeout)
  - Enhanced error logging and monitoring for email failures
  - Email status tracking in database with attempt counts and timestamps
  - Manual email retry API endpoint (`/api/retry-email`)
  - Email status monitoring API with analytics (`/api/email-status`)
  - EmailStatusMonitor component for admin dashboard visibility
  - Badge UI component for status indicators
  
### Improved
- Azure email client initialization with enhanced validation
- Error classification to prevent unnecessary retries on auth/config issues
- Database conversation records now include detailed email tracking
- User error messages when email delivery fails
- Email configuration validation with detailed error reporting

### Fixed
- Intermittent email delivery failures through comprehensive retry system
- Email polling timeouts that could cause hanging operations
- Missing error context for failed email operations

## [1.2.0] - 2024-12-XX

### Added
- **Hybrid Rendering System**
  - SmartMessage component for intelligent markdown/HTML switching
  - Professional HTML brief templates for email delivery
  - Enhanced email templates with FLOWORK branding
  
### Changed
- Brief generation now uses structured HTML instead of markdown for emails
- Chat conversations still use markdown for better readability
- Email templates redesigned for better client compatibility

### Fixed
- Markdown rendering issues in email clients
- Brief formatting inconsistencies between chat and email

## [1.1.0] - 2024-12-XX

### Added
- **Data Persistence & Email Integration**
  - Azure Cosmos DB integration for conversation storage
  - Azure Communication Services for email delivery
  - Automatic brief email sending after completion
  - Contact information collection system
  - Brief viewing page at `/brief/[id]` route
  - ConversationSaver component for automatic saving
  
### Improved
- System prompt updated to full version with 9-step interview process
- Budget discovery moved to early in conversation flow
- Video technical specifications added to prompts
- Thai language support with numbered list fixes
- Duplicate email prevention system

### Fixed
- AI responses starting with "it!" or "it" 
- Thai language content filtering issues
- Numbered list display in Thai language responses
- Git repository structure and Vercel deployment issues

## [1.0.0] - 2024-12-XX

### Added
- **Core AI Brief Generator MVP**
  - Next.js 15 application with TypeScript
  - Azure OpenAI Service integration with streaming responses
  - Comprehensive interview flow with 9 structured steps
  - Dark theme with gradient backgrounds (gray-950 to indigo-800)
  - Sky-500 accent colors throughout UI
  - Markdown rendering for chat messages
  - Shift+Enter functionality for multi-line input
  - Responsive design for desktop and mobile
  
- **FLOWORK Branding**
  - Complete rebrand from INSTANCEWORK to FLOWORK
  - Professional landing page with project type examples
  - Two-row input layout with styled submit buttons
  - Safeguards to keep conversations focused on brief generation
  
- **Multilingual Support**
  - Thai and English language support
  - Culturally appropriate responses and formatting
  - Thai-specific numbered list handling
  
### Technical Features
- **Architecture**
  - App Router pattern with TypeScript strict mode
  - Tailwind CSS v4 for styling
  - Radix UI component library
  - Custom hooks for state management
  - API routes with edge runtime
  
- **AI Integration**
  - Azure OpenAI GPT-4 with streaming responses
  - Comprehensive system prompt with interview guidance
  - Context-aware conversation management
  - Error handling for content filtering

### Project Types Supported
- Logo and branding design
- Website development
- Video production
- Marketing campaigns and materials
- Product design

---

## Version Format

- **Major** (X.0.0): Breaking changes, major new features
- **Minor** (0.X.0): New features, significant improvements
- **Patch** (0.0.X): Bug fixes, minor improvements

## Categories

- **Added**: New features
- **Changed**: Changes in existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Vulnerability fixes
- **Improved**: Enhancements to existing features