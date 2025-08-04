"use client";

import { useEffect, useCallback, useRef } from 'react';
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
  // Track if we've already saved to prevent duplicates
  const hasSavedRef = useRef(false);
  const saveConversation = useCallback(async () => {
    // Prevent duplicate saves
    if (hasSavedRef.current) {
      console.log('Conversation already saved, skipping duplicate save');
      return;
    }

    try {
      // Parse brief and contact info from messages
      console.log('ConversationSaver: Starting to parse brief and contact info');
      const brief = parseBriefFromMessages(conversation.messages);
      const contactInfo = parseContactInfoFromMessages(conversation.messages);

      console.log('ConversationSaver: Brief parsed:', !!brief);
      console.log('ConversationSaver: Contact info parsed:', !!contactInfo, contactInfo);

      if (!brief || !contactInfo) {
        console.error('ConversationSaver: Missing data - Brief:', !!brief, 'Contact:', !!contactInfo);
        throw new Error(`Could not extract ${!brief ? 'brief' : 'contact information'} from conversation`);
      }

      // Mark as saved before making the request to prevent race conditions
      hasSavedRef.current = true;

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
      // Reset the flag on error so it can be retried
      hasSavedRef.current = false;
      console.error('Error saving conversation:', error);
      onSaveError?.(error instanceof Error ? error : new Error('Unknown error'));
    }
  }, [conversation, onSaveComplete, onSaveError]);

  useEffect(() => {
    console.log('ConversationSaver useEffect - Status:', conversation.status, 'Messages:', conversation.messages.length);
    
    // Automatically save when conversation is completed AND we have contact info
    if (conversation.status === 'completed') {
      console.log('ConversationSaver: Conversation completed, checking for contact info');
      // Check if we actually have contact info before saving
      const contactInfo = parseContactInfoFromMessages(conversation.messages);
      console.log('ConversationSaver: Contact info check result:', contactInfo);
      
      if (contactInfo && contactInfo.email) {
        console.log('ConversationSaver: Contact info found, triggering save');
        saveConversation();
      } else {
        console.log('ConversationSaver: No valid contact info found, not saving');
      }
    }
  }, [conversation.status, conversation.messages, saveConversation]);

  return null; // This is a non-visual component
}