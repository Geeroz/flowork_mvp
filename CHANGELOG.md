# Changelog

All notable changes to the FLOWORK AI Brief Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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