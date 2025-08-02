# INSTANCEWORK Brief Generator MVP

An AI-powered project discovery tool that generates comprehensive creative briefs through conversational interviews.

## Features

- **AI-Guided Interviews**: Smart questioning that adapts based on project type
- **Quick Process**: Generate professional briefs in 15-20 minutes
- **Multiple Project Types**: Support for branding, websites, video, marketing campaigns
- **Professional Output**: Comprehensive briefs ready for stakeholders and vendors
- **Email Delivery**: Automatic brief delivery to user's email (coming soon)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + Custom components
- **AI**: Azure OpenAI Service (GPT-4)
- **State Management**: React hooks + Context

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Azure OpenAI Service account with GPT-4 deployment
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and add your Azure OpenAI credentials:
   ```env
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
   AZURE_OPENAI_KEY=your-api-key
   AZURE_OPENAI_DEPLOYMENT=your-deployment-name
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
flow_brief_mvp/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── prompts/         # AI system prompts
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

The application follows a conversational flow:

1. **Landing Page**: User describes their project need
2. **Chat Interface**: AI conducts structured interview
3. **Brief Generation**: System generates comprehensive brief
4. **Email Delivery**: Brief sent to user's email (planned)

## Interview Flow

1. Opening discovery question
2. Project type identification
3. Business context gathering
4. Timeline discovery
5. Budget discussion
6. Project-specific deep dive
7. Email collection
8. Brief generation

## Future Enhancements

- Email delivery integration
- PDF brief generation
- Database persistence
- Admin dashboard for lead management
- Analytics and tracking
- Multi-language support (Thai)

## License

Proprietary - INSTANCEWORK