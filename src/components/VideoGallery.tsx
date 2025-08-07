"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Play } from 'lucide-react';

interface PortfolioVideo {
  id: number;
  title: string;
  url: string;
  category: string;
  thumbnail?: string;
}

interface VideoGalleryProps {
  videos: PortfolioVideo[];
}

export function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<PortfolioVideo | null>(null);

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const handleVideoClick = (video: PortfolioVideo) => {
    setSelectedVideo(video);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedVideo) {
        closeModal();
      }
    };

    if (selectedVideo) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  const getThumbnail = (url: string) => {
    // Extract YouTube video ID
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
    }
    
    // Extract Vimeo video ID  
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://vumbnail.com/${vimeoMatch[1]}.jpg`;
    }
    
    return '/api/placeholder/480/270'; // fallback
  };

  const getEmbedUrl = (url: string) => {
    // Convert YouTube URL to embed format
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
    }
    
    // Convert Vimeo URL to embed format
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
    }
    
    return url;
  };

  return (
    <>
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group cursor-pointer bg-neutral-100 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
            onClick={() => handleVideoClick(video)}
          >
            <div className="relative aspect-video bg-neutral-200">
              <Image
                src={video.thumbnail || getThumbnail(video.url)}
                alt={video.title}
                width={480}
                height={270}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  // Fallback if thumbnail fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = '/api/placeholder/480/270';
                }}
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-neutral-800 ml-1" fill="currentColor" />
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-neutral-800/80 text-white text-xs rounded-full">
                  {video.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-neutral-700 group-hover:text-neutral-900 transition-colors duration-200">
                {video.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative w-full max-w-4xl bg-neutral-900 rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-t-lg">
              <iframe
                src={getEmbedUrl(selectedVideo.url)}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-t-lg"
              />
            </div>
            
            {/* Video Info */}
            <div className="p-6 bg-neutral-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-neutral-700 mb-2">
                    {selectedVideo.title}
                  </h3>
                  <span className="px-3 py-1 bg-neutral-200 text-neutral-700 text-sm rounded-full">
                    {selectedVideo.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}