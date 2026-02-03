'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GalleryMedia } from '@/lib/supabase/gallery';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  item: GalleryMedia;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalItems: number;
}

export default function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalItems,
}: LightboxProps) {
  const isVideo = item.media_type === 'video';

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-golden/10 border border-golden/30 text-golden hover:bg-golden hover:text-black transition-all duration-300 hover:scale-110"
        aria-label="Close lightbox"
      >
        <X size={24} />
      </motion.button>

      {/* Navigation Buttons */}
      {totalItems > 1 && (
        <>
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-golden/10 border border-golden/30 text-golden hover:bg-golden hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-golden/10 border border-golden/30 text-golden hover:bg-golden hover:text-black transition-all duration-300 hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </motion.button>
        </>
      )}

      {/* Counter */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 z-10 px-4 py-2 rounded-full bg-golden/10 border border-golden/30 text-golden text-sm tracking-wider"
      >
        {currentIndex + 1} / {totalItems}
      </motion.div>

      {/* Media Content */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-[90vw] max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={item.media_url}
            controls
            autoPlay
            className="max-w-full max-h-[80vh] rounded-lg shadow-[0_0_60px_rgba(212,175,55,0.3)]"
          />
        ) : (
          <Image
            src={item.media_url}
            alt={item.title || 'Gallery image'}
            width={1920}
            height={1080}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-[0_0_60px_rgba(212,175,55,0.3)]"
            priority
          />
        )}

        {/* Title and Description */}
        {(item.title || item.description) && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center max-w-2xl px-4"
          >
            {item.title && (
              <h2 className="text-golden text-2xl md:text-3xl font-light tracking-wide mb-2">
                {item.title}
              </h2>
            )}
            {item.description && (
              <p className="text-golden-light text-base md:text-lg font-light">
                {item.description}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-golden-light/60 text-sm tracking-wider hidden md:block"
      >
        Press ESC to close • Use arrow keys to navigate
      </motion.div>
    </motion.div>
  );
}