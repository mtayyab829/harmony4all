'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import InlineVideoPlayer from './InlineVideoPlayer';

interface FeaturedBlogImageProps {
  image: string;
  alt: string;
  url?: string;
  videoUrl?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  containerClassName?: string;
  onImageClick?: (e: React.MouseEvent) => void;
}

export default function FeaturedBlogImage({
  image,
  alt,
  url,
  videoUrl,
  fill = true,
  className = 'object-contain',
  sizes,
  quality = 85,
  priority = false,
  containerClassName = 'relative w-full h-full',
  onImageClick,
}: FeaturedBlogImageProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!url && videoUrl && isPlaying) {
    return (
      <div className={containerClassName}>
        <InlineVideoPlayer
          videoUrl={videoUrl}
          onClose={() => setIsPlaying(false)}
        />
      </div>
    );
  }

  const imageElement = (
    <Image
      src={image}
      alt={alt}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      className={className}
    />
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${containerClassName} block cursor-pointer group`}
        title="Click to open in new tab"
        onClick={(e) => {
          e.stopPropagation();
          onImageClick?.(e);
        }}
      >
        {imageElement}
      </a>
    );
  }

  if (videoUrl) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onImageClick?.(e);
          setIsPlaying(true);
        }}
        className={`${containerClassName} block cursor-pointer group border-0 p-0 bg-transparent`}
        title="Click to play video"
      >
        {imageElement}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="rounded-full bg-white/90 p-3 md:p-4 shadow-lg">
            <svg className="h-6 w-6 md:h-8 md:w-8 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className={containerClassName}>
      {imageElement}
    </div>
  );
}
