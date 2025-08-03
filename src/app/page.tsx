"use client";

import { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { ChatInterface } from '@/components/ChatInterface';
import { ConversationSaver } from '@/components/ConversationSaver';
import { useAIChat } from '@/hooks/useAIChat';

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const { messages, isLoading, currentStep, sendMessage, stopGeneration, resetChat, conversation } = useAIChat({
    onBriefComplete: (conversation) => {
      console.log('Brief completed:', conversation);
      setSaveStatus('Saving your brief...');
    }
  });
  
  const handleStartChat = (initialPrompt: string) => {
    setShowChat(true);
    sendMessage(initialPrompt);
  };
  
  const handleBackToHome = () => {
    setShowChat(false);
    resetChat();
    setSaveStatus(null);
  };

  const handleSaveComplete = (result: { success: boolean; message: string }) => {
    setSaveStatus(`✓ ${result.message}`);
  };

  const handleSaveError = (error: Error) => {
    setSaveStatus(`⚠ ${error.message}`);
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
        <ConversationSaver
          conversation={conversation}
          onSaveComplete={handleSaveComplete}
          onSaveError={handleSaveError}
        />
        <div className="fixed top-4 left-4">
          <button
            onClick={handleBackToHome}
            className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          >
            ← Start Over
          </button>
        </div>
        {saveStatus && (
          <div className="fixed bottom-4 right-4 bg-black/80 text-white px-4 py-2 rounded-lg border border-gray-700/30">
            {saveStatus}
          </div>
        )}
      </>
    );
  }
  
  return <LandingPage onStartChat={handleStartChat} />;
}