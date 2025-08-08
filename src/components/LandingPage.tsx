"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

interface LandingPageProps {
  onStartChat: (initialPrompt: string) => void;
}

export function LandingPage({ onStartChat }: LandingPageProps) {
  const [prompt, setPrompt] = useState('');
  const [showProjectTypes, setShowProjectTypes] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onStartChat(prompt.trim());
    }
  };
  
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      {/* Main content - centered vertically */}
      <div className="flex-1 flex items-center justify-center pt-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          {/* <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-700 mb-4">
              Flowork
            </h1>
            <p className="text-xl text-gray-400 mb-2">
              An AI-powered managed freelance platform that guarantees project delivery. Simply describe what you need, and we handle everything with the top 10% of vetted freelancers
            </p>
          </div> */}

          {/* Hero Section */}
        <section className="py-6 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-700 mb-8">
              Flowork
            </h1>
            <p className="text-3xl md:text-4xl text-gray-500 leading-tight max-w-4xl mx-auto">
              {/* At <span className='font-bold text-neutral-600'>Flowork</span>, we believe great work happens when everyone&apos;s in their <span className='font-bold text-neutral-600'>flow state</span>. 
              Clients flow through project delivery without <span className='font-bold text-neutral-600'>friction</span>. Freelancers flow through 
              creative work <span className='font-bold text-neutral-600'>without commission fees</span>. Everything just... <span className='font-bold text-neutral-600'>flows</span>. */}
              An <span className='font-bold text-neutral-600'>AI-powered</span> managed freelance platform that <span className='font-bold text-neutral-600'>guarantees</span> project delivery. Simply describe what you need, and we handle everything with the <span className='font-bold text-neutral-600'>top 10%</span> of vetted freelancers
            </p>
          </div>
        </section>


          {/* Popular project types */}
          <div className="mb-8 text-center">
            <button
              onClick={() => setShowProjectTypes(!showProjectTypes)}
              className="flex items-center justify-center mx-auto mb-4 text-gray-500 hover:text-neutral-700 transition-colors duration-200 focus:outline-none focus:text-neutral-700"
            >
              <span className="mr-2">Popular project types</span>
              <ChevronDown 
                className={`w-4 h-4 transition-transform duration-200 ${
                  showProjectTypes ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showProjectTypes 
                  ? 'max-h-32 opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  'Video Production',
                  'Social Media Content',
                  'Website Development',
                  'Marketing Campaign',
                  'TikTok Clip',
                  'Restaurant Video',
                  'Brand Identity'
                ].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPrompt(`I need help with ${type.toLowerCase()}`)}
                    className="px-4 py-2 bg-neutral-400 hover:bg-black/80 rounded-full text-sm text-gray-200 transition-colors duration-300"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Input */}
          <Card className="shadow-2xl border border-neutral-400/30 bg-neutral-300 backdrop-blur">
            <CardContent className="p-4">
              <form onSubmit={handleSubmit}>
                {/* First Row: Input Field */}
                <div className="mb-4">
                  <input
                    id="project-input"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Start your flow here..."
                    className="w-full px-6 py-4 text-lg bg-neutral-50 border border-neutral-400 text-neutral-900 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none placeholder:text-gray-400"
                    autoFocus
                  />
                </div>
                
                {/* Second Row: Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className={`pl-3 pr-2 transition-all duration-200 bg-neutral-400 ${
                      prompt.trim() 
                        ? 'hover:bg-sky-600 hover:border-sky-600' 
                        : 'cursor-not-allowed'
                    }`}
                    disabled={!prompt.trim()}
                  >
                    <span className={`transition-colors duration-200 ${
                      prompt.trim() ? 'text-white' : 'text-neutral-200'
                    }`}>
                      Get My Brief
                    </span>
                    <div className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      prompt.trim() 
                        ? 'bg-white hover:bg-white' 
                        : 'bg-gray-100'
                    }`}>
                      <ArrowUp strokeWidth={3} className={`h-8 w-8 transition-colors duration-200 ${
                        prompt.trim() ? 'text-black' : 'text-gray-800'
                      }`} />
                    </div>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Tagline */}
          <div className="text-center mt-12">
            <h1 className='text-6xl md:text-8xl font-bold text-neutral-300 mb-6'>
              Just Describe.<br />
              We Deliver.
            </h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}