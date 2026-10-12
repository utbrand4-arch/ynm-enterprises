import React, { useEffect, useRef, useState } from 'react';

export const BackgroundMedia: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoLoaded(true);
        })
        .catch((err) => {
          console.log('Video autoplay prevented or suspended:', err);
        });
    }
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Real Full-Website Background Video Playing Behind Content */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/tissue_ambient_bg.jpg"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 opacity-40 scale-105"
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="/tissue-background.mp4" type="video/mp4" />
        {/* Fallback image if video cannot play */}
        <img
          src="/tissue_ambient_bg.jpg"
          alt="YNM Enterprises Tissue Background"
          className="w-full h-full object-cover"
        />
      </video>

      {/* Static Fallback Poster if Video is loading or reduced-motion is requested */}
      {!videoLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/tissue_ambient_bg.jpg')` }}
        />
      )}

      {/* Translucent White Overlay - Ensures High Text Contrast & Readability Across All Sections */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[1.5px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95" />

      {/* Subtle Corporate Lighting Tints */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-teal-100/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-32 w-96 h-96 bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/3 w-96 h-96 bg-emerald-100/25 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
