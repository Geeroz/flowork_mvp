"use client";

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { VideoGallery } from '@/components/VideoGallery';

// Sample portfolio videos data
const portfolioVideos = [
  {
    id: 1,
    title: "Modern Logo Design Process",
    url: "https://www.youtube.com/watch?v=7WxSFa2mfFU",
    category: "Design Excellence"
  },
  {
    id: 2,
    title: "E-commerce Website Development",
    url: "https://vimeo.com/1048439326",
    category: "Development"
  },
  {
    id: 3,
    title: "Brand Identity Campaign",
    url: "https://www.youtube.com/watch?v=7WxSFa2mfFU",
    category: "Marketing"
  },
  {
    id: 4,
    title: "Restaurant Mobile App",
    url: "https://vimeo.com/1048439326",
    category: "Development"
  },
  {
    id: 5,
    title: "Social Media Content Series",
    url: "https://www.youtube.com/watch?v=7WxSFa2mfFU",
    category: "Content & Marketing"
  },
  {
    id: 6,
    title: "Corporate Video Production",
    url: "https://vimeo.com/1048439326",
    category: "Content & Marketing"
  },
  {
    id: 7,
    title: "Web UI/UX Design",
    url: "https://www.youtube.com/watch?v=7WxSFa2mfFU",
    category: "Design Excellence"
  },
  {
    id: 8,
    title: "Marketing Strategy Case Study",
    url: "https://vimeo.com/1048439326",
    category: "Marketing"
  },
  {
    id: 9,
    title: "Technical Integration Demo",
    url: "https://www.youtube.com/watch?v=7WxSFa2mfFU",
    category: "Development"
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      
      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-700 mb-8">
              About
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 leading-relaxed max-w-4xl mx-auto">
              At Flowork, we believe great work happens when everyone&apos;s in their flow state. 
              Clients flow through project delivery without friction. Freelancers flow through 
              creative work without commission fees. Everything just... flows.
            </p>
          </div>
        </section>

        {/* Our Service Section */}
        <section className="py-16 bg-neutral-100">
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
        <section className="py-16">
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

      </main>
      
      <Footer />
    </div>
  );
}