"use client";

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VideoGallery } from '@/components/VideoGallery';

// Sample portfolio videos data
const portfolioVideos = [
  {
    id: 1,
    title: "Visa XB1",
    url: "https://vimeo.com/1099575755",
    category: "TV Commercial"
  },
  {
    id: 2,
    title: "Visa EDS",
    url: "https://vimeo.com/1108108946",
    category: "TV Commercial"
  },
  {
    id: 3,
    title: "In-Store Restaurant Signage",
    url: "https://youtu.be/_6a10Zk8TlM",
    category: "CafeSlash"
  },
  {
    id: 4,
    title: "Ai Generated Video",
    url: "https://youtu.be/n_JhlvLPwhg",
    category: "Ai Video"
  },
  {
    id: 5,
    title: "Honda Beat",
    url: "https://vimeo.com/868916264",
    category: "Content & Marketing"
  },
  {
    id: 6,
    title: "Ronaldo - Tested to the Limit",
    url: "https://vimeo.com/868916052",
    category: "Content & Marketing"
  },
  {
    id: 7,
    title: "Cinemagraph",
    url: "https://youtu.be/1g07o_8kOtY",
    category: "Cinemagraph"
  },
  {
    id: 8,
    title: "TV Commercial Finishing",
    url: "https://youtu.be/dwsfOdW1_E0",
    category: "TV Commercial"
  },
  {
    id: 9,
    title: "LazLook",
    url: "https://vimeo.com/867468416",
    category: "Social Media Content"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-6 md:py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-700 mb-8">
              About
            </h1>
            <p className="text-3xl md:text-4xl text-gray-500 leading-tight max-w-4xl mx-auto">
              At <span className='font-bold text-neutral-600'>Flowork</span>, we believe great work happens when everyone&apos;s in their <span className='font-bold text-neutral-600'>flow state</span>. 
              Clients flow through project delivery without <span className='font-bold text-neutral-600'>friction</span>. Freelancers flow through 
              creative work <span className='font-bold text-neutral-600'>without commission fees</span>. Everything just... <span className='font-bold text-neutral-600'>flows</span>.
            </p>
          </div>
        </section>

        {/* Examples of Our Work Section */}
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-4">
                Examples of Our Work
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Portfolio pieces created by our freelancers across design, development, and marketing projects
              </p>
            </div>
            
            <VideoGallery videos={portfolioVideos} />
          </div>
        </section>

        {/* Our Service Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-700 mb-8">
              Our Service
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-max-w-4xl mx-auto">
              An AI-powered managed freelance platform that guarantees project delivery by 
              handling everything from brief to completion, making quality digital work as easy 
              as having a conversation. We connect you exclusively with the top 10% of peer-reviewed, 
              vetted freelancers and manage every step from brief to delivery.
            </p>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="py-16 bg-neutral-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Design Excellence */}
              <div className="">
                <h3 className="text-2xl font-bold text-neutral-700 mb-6">
                  Design Excellence
                </h3>
                <ul className="space-y-0 text-gray-600">
                  <li className="text-lg leading-tight">Graphic Design</li>
                  <li className="text-lg leading-tight">Web/UI Design</li>
                  <li className="text-lg leading-tight">Marketing Design</li>
                </ul>
              </div>

              {/* Content & Marketing */}
              <div className="">
                <h3 className="text-2xl font-bold text-neutral-700 mb-6">
                  Content & Marketing
                </h3>
                <ul className="space-y-0 text-gray-600">
                  <li className="text-lg leading-tight">Writing Services</li>
                  <li className="text-lg leading-tight">Specialized Content</li>
                  <li className="text-lg leading-tight">Content Production</li>
                  <li className="text-lg leading-tight">Digital Marketing</li>
                  <li className="text-lg leading-tight">Marketing Strategy</li>
                  <li className="text-lg leading-tight">Traditional Marketing</li>
                </ul>
              </div>

              {/* Development Expertise */}
              <div className="">
                <h3 className="text-2xl font-bold text-neutral-700 mb-6">
                  Development Expertise
                </h3>
                <ul className="space-y-0 text-gray-600">
                  <li className="text-lg leading-tight">Web Development</li>
                  <li className="text-lg leading-tight">Mobile Development</li>
                  <li className="text-lg leading-tight">Technical Specialties</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  );
}