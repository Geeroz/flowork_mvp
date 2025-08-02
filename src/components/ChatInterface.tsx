"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Send, Loader2, User, Bot } from 'lucide-react';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { MarkdownMessage } from '@/components/MarkdownMessage';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  isLoading: boolean;
  currentStep: number;
  totalSteps?: number;
  onSendMessage: (message: string) => void;
  onStop?: () => void;
}

export function ChatInterface({
  messages,
  isLoading,
  currentStep,
  totalSteps = 8,
  onSendMessage,
  onStop,
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [isLoading]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSendMessage(input.trim());
        setInput('');
      }
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-800 animate-gradient">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-white">Creating Your Brief</h2>
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
        </div>
        
        {/* Chat Messages */}
        <Card className="shadow-2xl border border-gray-700/30 bg-black/80 backdrop-blur mb-4">
          <CardContent className="p-6">
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-sky-500" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg p-4",
                      message.role === 'user'
                        ? "bg-sky-500 text-white"
                        : "bg-black/70 text-gray-100"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <MarkdownMessage content={message.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-200" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="bg-black/70 rounded-lg p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
        
        
        {/* Input */}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer... (Shift+Enter for new line)"
              className="flex-1 px-4 py-3 bg-black/80 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none placeholder:text-gray-400 resize-none min-h-[48px] max-h-32"
              disabled={isLoading}
              rows={1}
              style={{
                height: 'auto',
                minHeight: '48px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 128) + 'px';
              }}
            />
            <Button type="submit" size="lg" disabled={!input.trim() || isLoading}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
        </form>
        
        {isLoading && onStop && (
          <div className="mt-2 text-center">
            <Button variant="ghost" size="sm" onClick={onStop} className="text-gray-400 hover:text-gray-200">
              Stop generating
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

