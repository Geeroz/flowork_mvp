"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, Sparkles, Clock, FileText } from 'lucide-react';

interface LandingPageProps {
  onStartChat: (initialPrompt: string) => void;
}

export function LandingPage({ onStartChat }: LandingPageProps) {
  const [prompt, setPrompt] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onStartChat(prompt.trim());
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-indigo-800 animate-gradient">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Your Professional Project Brief
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            AI-powered discovery interviews that capture every detail
          </p>
          <p className="text-sm text-gray-400">
            By INSTANCEWORK - Thailand&apos;s Premium Creative Talent Marketplace
          </p>
        </div>
        
        {/* Main Input */}
        <Card className="shadow-2xl border border-gray-700/30 bg-black/80 backdrop-blur">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              <label htmlFor="project-input" className="block text-lg font-medium mb-4 text-white">
                What kind of creative work do you need?
              </label>
              
              {/* First Row: Input Field */}
              <div className="mb-4">
                <input
                  id="project-input"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., I need a new website for my restaurant..."
                  className="w-full px-6 py-4 text-lg bg-black/80 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none placeholder:text-gray-400"
                  autoFocus
                />
              </div>
              
              {/* Second Row: Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="lg"
                  className={`px-6 transition-all duration-200 ${
                    prompt.trim() 
                      ? 'hover:bg-sky-600 hover:border-sky-600' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                  disabled={!prompt.trim()}
                >
                  <span className={`transition-colors duration-200 ${
                    prompt.trim() ? 'text-white' : 'text-gray-400'
                  }`}>
                    Get My Brief
                  </span>
                  <div className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                    prompt.trim() 
                      ? 'bg-gray-300 hover:bg-white' 
                      : 'bg-gray-600'
                  }`}>
                    <ArrowUp className={`h-4 w-4 transition-colors duration-200 ${
                      prompt.trim() ? 'text-black' : 'text-gray-800'
                    }`} />
                  </div>
                </Button>
              </div>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Used by 500+ businesses in Thailand
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-4">Popular project types:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Logo Design',
              'Website Development',
              'Marketing Campaign',
              'Video Production',
              'Social Media Content',
              'Brand Identity'
            ].map((type) => (
              <button
                key={type}
                onClick={() => setPrompt(`I need help with ${type.toLowerCase()}`)}
                className="px-4 py-2 bg-black/60 hover:bg-black/80 border border-gray-600 rounded-full text-sm text-gray-200 transition-colors"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        
        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="border border-gray-700/30 bg-black/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 text-sky-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-white">15-20 Minutes</h3>
              <p className="text-sm text-gray-300">
                From idea to comprehensive brief in record time
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-700/30 bg-black/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <Sparkles className="w-10 h-10 text-sky-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-white">AI-Guided Process</h3>
              <p className="text-sm text-gray-300">
                Expert questions that ensure nothing is missed
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-700/30 bg-black/50 backdrop-blur">
            <CardContent className="p-6 text-center">
              <FileText className="w-10 h-10 text-sky-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2 text-white">Professional Output</h3>
              <p className="text-sm text-gray-300">
                Ready to share with stakeholders or vendors
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}