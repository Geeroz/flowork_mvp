# User Flow: "Get My Brief" Button

This document explains what happens when a user clicks the "Get My Brief" button on the FLOWORK AI Brief Generator landing page.

## Overview

The "Get My Brief" button initiates an AI-powered interview process that transforms a user's project description into a comprehensive creative brief through a structured conversation flow.

## Step-by-Step Flow

### 1. **Form Submission** (`LandingPage.tsx:16-21`)
- The `handleSubmit` function is triggered
- Prevents default form behavior
- Validates that the prompt input has content
- Calls `onStartChat(prompt.trim())` with the user's input

### 2. **State Transition** (`page.tsx:19-22`)
- `handleStartChat` function executes:
  - Sets `showChat` to `true` (switches from landing page to chat interface)
  - Calls `sendMessage(initialPrompt)` to start the conversation

### 3. **UI Switch** (`page.tsx:38-68`)
- App conditionally renders `ChatInterface` instead of `LandingPage`
- Also renders `ConversationSaver` component for automatic saving
- Shows "Start Over" button and save status notifications

### 4. **AI Chat Processing** (`useAIChat.ts:26-50`)
- `sendMessage` function creates a user message object
- Adds message to local state and conversation ref
- Sets initial prompt if this is the first message
- Sets loading state to true
- Makes API call to `/api/chat` endpoint

### 5. **AI API Call** (`api/chat/route.ts:7-30`)
- Receives messages and current step from frontend
- Validates Azure OpenAI configuration
- Adds system prompt with current interview step
- Sends request to Azure OpenAI with streaming enabled

### 6. **AI Response Processing**
- AI responds with streaming text (following the system prompt for brief generation)
- Response is processed chunk by chunk and displayed in real-time
- Conversation progresses through 7 structured interview steps
- When complete, triggers conversation saving and email delivery

### 7. **Automatic Saving**
- `ConversationSaver` component monitors conversation completion
- Saves to Azure Cosmos DB
- Sends brief via email using Azure Communication Services
- Shows save status to user

## Key Components Involved

- **LandingPage**: Initial form and input handling
- **ChatInterface**: Real-time conversation display
- **useAIChat**: Chat state management and API communication
- **ConversationSaver**: Automatic data persistence and email delivery
- **API Routes**: Backend processing and AI integration

## Technical Details

- **State Management**: React hooks for local state, conversation stored in refs
- **AI Integration**: Azure OpenAI Service with streaming responses
- **Data Persistence**: Azure Cosmos DB for conversation storage
- **Email Delivery**: Azure Communication Services for brief distribution
- **UI Transitions**: Conditional rendering based on `showChat` state

## Result

The user receives a comprehensive creative brief via email containing:
- Project specifications
- Technical requirements
- Budget considerations
- Timeline expectations
- Deliverables outline

This automated process eliminates the need for manual project scoping and ensures consistent, professional brief generation for all creative projects.