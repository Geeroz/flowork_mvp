"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUp, Loader2, User, Bot } from 'lucide-react';
import { ChatMessage } from '@/types';
import { cn } from '@/lib/utils';
import { SmartMessage } from '@/components/SmartMessage';

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
  totalSteps = 7,
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
    <div className="min-h-screen bg-neutral-50">
      <div className="container mx-auto px-2 py-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-neutral-700">Creating Your Brief</h2>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {totalSteps}
            </span>
          </div>
          <Progress value={((currentStep + 1) / totalSteps) * 100} className="h-2" />
        </div>
        
        {/* Chat Messages */}
        <Card className="bg-neutral-200 mb-4 border-none shadow-none">
          <CardContent className="py-2">
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-2",
                    message.role === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2",
                      message.role === 'user'
                        ? "bg-sky-500 text-neutral-900"
                        : "bg-neutral-50 text-neutral-900"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <SmartMessage content={message.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-neutral-400/50 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-sky-500" />
                  </div>
                  <div className="bg-neutral-50/70 rounded-lg p-4">
                    <Loader2 className="w-5 h-5 animate-spin text-sky-500" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
        
        
        {/* Input */}
        <Card className="border border-neutral-400/30 bg-neutral-200 backdrop-blur">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit}>
              {/* First Row: Input Field */}
              <div className="mb-4">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer... (Shift+Enter for new line)"
                  className="w-full px-6 py-4 text-lg bg-neutral-50 border border-neutral-400/50 text-neutral-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none placeholder:text-gray-400 resize-none min-h-[56px] max-h-32"
                  disabled={isLoading}
                  rows={1}
                  style={{
                    height: 'auto',
                    minHeight: '56px',
                  }}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = Math.min(target.scrollHeight, 128) + 'px';
                  }}
                />
              </div>
              
              {/* Second Row: Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className={`px-2 transition-all duration-200 ${
                    input.trim() && !isLoading
                      ? 'hover:bg-sky-600 hover:border-sky-600' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!input.trim() || isLoading}
                >
                  <span className={`transition-colors duration-200 ${
                    input.trim() && !isLoading ? 'text-neutral-900' : 'text-gray-500'
                  }`}>
                    {isLoading ? 'Sending...' : 'Send'}
                  </span>
                  <div className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    input.trim() && !isLoading
                      ? 'bg-neutral-50 hover:bg-neutral-50' 
                      : 'bg-gray-200'
                  }`}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin text-neutral-900" />
                    ) : (
                      <ArrowUp strokeWidth={3} className={`h-8 w-8 transition-colors duration-200 ${
                        input.trim() ? 'text-neutral-900' : 'text-gray-800'
                      }`} />
                    )}
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {isLoading && onStop && (
          <div className="mt-2 text-center">
            <Button variant="ghost" size="sm" onClick={onStop} className="text-gray-500 hover:text-neutral-700">
              Stop generating
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

