"use client";

import { useState, useCallback, useRef } from 'react';
import { ChatMessage, Conversation } from '@/types';
import { generateId } from '@/lib/utils';

interface UseAIChatProps {
  onBriefComplete?: (conversation: Conversation) => void;
}

export function useAIChat({ onBriefComplete }: UseAIChatProps = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const conversationRef = useRef<Conversation>({
    id: generateId(),
    messages: [],
    status: 'active',
    initialPrompt: '',
    createdAt: new Date(),
  });

  const sendMessage = useCallback(async (content: string) => {
    setError(null);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    conversationRef.current.messages.push(userMessage);
    
    // Store initial prompt
    if (conversationRef.current.messages.length === 1) {
      conversationRef.current.initialPrompt = content;
    }
    
    setIsLoading(true);
    
    try {
      abortControllerRef.current = new AbortController();
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: conversationRef.current.messages,
          currentStep,
        }),
        signal: abortControllerRef.current.signal,
      });
      
      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }
      
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) {
        throw new Error('No response stream available');
      }
      
      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      let isFirstChunk = true;
      let buffer = '';
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        
        // Log first chunk for debugging
        if (isFirstChunk) {
          console.log('First chunk received:', chunk);
          isFirstChunk = false;
        }
        
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        
        for (const line of lines) {
          if (line.trim() === '') continue;
          
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              conversationRef.current.messages.push(assistantMessage);
              setCurrentStep(prev => prev + 1);
              
              // Check if interview is complete (looking for contact collection)
              if (assistantMessage.content.includes('Your brief will be sent to') || 
                  assistantMessage.content.includes('FLOWORK Project Manager will reach out')) {
                conversationRef.current.status = 'completed';
                conversationRef.current.completedAt = new Date();
                onBriefComplete?.(conversationRef.current);
              }
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.choices?.[0]?.delta?.content) {
                const content = parsed.choices[0].delta.content;
                
                // Log the actual content being added
                if (assistantMessage.content === '') {
                  console.log('First content added:', content);
                }
                
                assistantMessage.content += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = { ...assistantMessage };
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Failed to parse chunk:', data, e);
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
        console.error('Chat error:', err);
      } else if (!(err instanceof Error)) {
        setError('Failed to send message');
        console.error('Chat error:', err);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [currentStep, onBriefComplete]);
  
  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);
  
  const resetChat = useCallback(() => {
    setMessages([]);
    setCurrentStep(0);
    setError(null);
    conversationRef.current = {
      id: generateId(),
      messages: [],
      status: 'active',
      initialPrompt: '',
      createdAt: new Date(),
    };
  }, []);
  
  return {
    messages,
    isLoading,
    error,
    currentStep,
    sendMessage,
    stopGeneration,
    resetChat,
    conversation: conversationRef.current,
  };
}