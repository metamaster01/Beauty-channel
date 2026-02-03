'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';
import { GalleryMedia } from '@/lib/supabase/gallery';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GalleryComponent() {
  const [items, setItems] = useState<GalleryMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_media')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems(data || []);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setError('Failed to load gallery. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedIndex === null) return;

    if (direction === 'prev') {
      setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : items.length - 1);
    } else {
      setSelectedIndex(selectedIndex < items.length - 1 ? selectedIndex + 1 : 0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            className="w-16 h-16 border-4 border-golden/20 border-t-golden rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p className="text-golden text-xl tracking-wide">Loading Gallery...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-red-400 text-xl">{error}</p>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <h2 className="text-golden text-4xl mb-4 font-light tracking-wider">No Media Found</h2>
          <p className="text-golden-light text-lg">The gallery is currently empty. Check back soon!</p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-container max-w-[1400px] mx-auto px-5 py-10 md:py-16 mt-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-5xl md:text-7xl text-golden mb-4 font-light tracking-[0.3em] uppercase">
            Gallery
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '120px' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-golden to-transparent mx-auto mb-6"
          />
          <p className="text-golden-light text-lg md:text-xl tracking-wide font-light">
            Explore our stunning collection
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="masonry-grid"
        >
          {items.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            item={items[selectedIndex]}
            onClose={closeLightbox}
            onPrev={() => navigateLightbox('prev')}
            onNext={() => navigateLightbox('next')}
            currentIndex={selectedIndex}
            totalItems={items.length}
          />
        )}
      </AnimatePresence>
    </>
  );
}