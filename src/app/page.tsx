"use client";

import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { ChatInterface } from '@/components/ChatInterface';
import { useAIChat } from '@/hooks/useAIChat';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const { messages, isLoading, currentStep, sendMessage, stopGeneration, resetChat } = useAIChat({
    onBriefComplete: (conversation) => {
      // TODO: Handle brief completion
      console.log('Brief completed:', conversation);
    }
  });
  
  const handleStartChat = (initialPrompt: string) => {
    setShowChat(true);
    sendMessage(initialPrompt);
  };
  
  const handleBackToHome = () => {
    setShowChat(false);
    resetChat();
  };
  
  if (showChat) {
    return (
      <>
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          currentStep={currentStep}
          onSendMessage={sendMessage}
          onStop={stopGeneration}
        />
        <div className="fixed top-4 left-4">
          <button
            onClick={handleBackToHome}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Start Over
          </button>
        </div>
      </>
    );
  }
  
  return <LandingPage onStartChat={handleStartChat} />;
}