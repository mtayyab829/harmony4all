'use client';

import React from 'react';
import { getEmbedUrl, isEmbeddableVideo } from '../lib/video-utils';

interface InlineVideoPlayerProps {
  videoUrl: string;
  onClose?: () => void;
  className?: string;
}

export default function InlineVideoPlayer({ videoUrl, onClose, className = '' }: InlineVideoPlayerProps) {
  const embedUrl = getEmbedUrl(videoUrl);
  const isEmbed = isEmbeddableVideo(videoUrl);

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 transition-colors"
          aria-label="Close video"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      {isEmbed ? (
        <iframe
          src={embedUrl}
          title="Video player"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video
          src={videoUrl}
          controls
          autoPlay
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );
}
