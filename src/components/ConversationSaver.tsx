"use client";

import { useEffect, useCallback } from 'react';
import { Conversation } from '@/types';
import { parseBriefFromMessages, parseContactInfoFromMessages } from '@/lib/utils/brief-parser';

interface ConversationSaverProps {
  conversation: Conversation;
  onSaveComplete?: (result: SaveResult) => void;
  onSaveError?: (error: Error) => void;
}

interface SaveResult {
  success: boolean;
  conversationId: string;
  briefId?: string;
  emailStatus?: string;
  message: string;
}

export function ConversationSaver({ 
  conversation, 
  onSaveComplete,
  onSaveError 
}: ConversationSaverProps) {
  const saveConversation = useCallback(async () => {
    try {
      // Parse brief and contact info from messages
      const brief = parseBriefFromMessages(conversation.messages);
      const contactInfo = parseContactInfoFromMessages(conversation.messages);

      if (!brief || !contactInfo) {
        throw new Error('Could not extract brief or contact information from conversation');
      }

      // Send to API
      const response = await fetch('/api/save-conversation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          conversationId: conversation.id,
          messages: conversation.messages,
          contactInfo,
          brief,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save conversation');
      }

      const result: SaveResult = await response.json();
      onSaveComplete?.(result);
    } catch (error) {
      console.error('Error saving conversation:', error);
      onSaveError?.(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, [conversation, onSaveComplete, onSaveError]);

  useEffect(() => {
    // Automatically save when conversation is completed
    if (conversation.status === 'completed') {
      saveConversation();
    }
  }, [conversation.status, saveConversation]);

  return null; // This is a non-visual component
}