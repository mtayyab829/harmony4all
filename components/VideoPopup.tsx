'use client';

import React, { useEffect } from 'react';
import { getEmbedUrl, isEmbeddableVideo } from '../lib/video-utils';

interface VideoPopupProps {
  videoUrl: string | null;
  onClose: () => void;
}

export default function VideoPopup({ videoUrl, onClose }: VideoPopupProps) {
  useEffect(() => {
    if (!videoUrl) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [videoUrl, onClose]);

  if (!videoUrl) return null;

  const embedUrl = getEmbedUrl(videoUrl);
  const isEmbed = isEmbeddableVideo(videoUrl);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 transition-colors"
        aria-label="Close video"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {isEmbed ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
            <iframe
              src={embedUrl}
              title="Video player"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full max-h-[80vh] rounded-lg bg-black"
          />
        )}
      </div>
    </div>
  );
}
