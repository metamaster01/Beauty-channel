'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { GalleryMedia } from '@/lib/supabase/gallery';

interface GalleryItemProps {
  item: GalleryMedia;
  index: number;
  onClick: () => void;
}

export default function GalleryItem({ item, index, onClick }: GalleryItemProps) {
  const isVideo = item.media_type === 'video';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="masonry-item group cursor-pointer mb-5 break-inside-avoid"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-golden/30 bg-zinc-900 transition-all duration-300 hover:border-golden hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]">
        {/* Media Content */}
        <div className="relative">
          {isVideo ? (
            <div className="relative">
              <video
                className="w-full h-auto block"
                preload="metadata"
                muted
                playsInline
              >
                <source src={item.media_url} type="video/mp4" />
              </video>
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-golden/90 flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,55,0.5)]"
                >
                  <div className="w-0 h-0 border-l-[16px] md:border-l-[20px] border-l-black border-y-[10px] md:border-y-[12px] border-y-transparent ml-1" />
                </motion.div>
              </div>
            </div>
          ) : (
            <Image
              src={item.media_url}
              alt={item.title || 'Gallery image'}
              width={800}
              height={600}
              className="w-full h-auto block"
              loading="lazy"
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-5"
          >
            {item.title && (
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-golden text-lg md:text-xl font-light tracking-wide mb-2"
              >
                {item.title}
              </motion.h3>
            )}
            {item.description && (
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileHover={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="text-golden-light text-sm md:text-base font-light line-clamp-2"
              >
                {item.description}
              </motion.p>
            )}
          </motion.div>
        </div>

        {/* Shimmer Effect on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-golden/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
}