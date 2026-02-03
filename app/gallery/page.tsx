// app/gallery/page.tsx
import { Metadata } from 'next';
import GalleryComponent from '@/components/GalleryPage/GalleryComponent';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
    title: 'Gallery - Beauty Channel | Professional Salon Services',
    description: 'Explore Beauty Channel gallery showcasing our professional bridal makeup, haircuts, makeup, facials, spa treatments, and more. View our salon services and transformations.',
    keywords: ['beauty salon', 'bridal makeup', 'haircut', 'makeup services', 'facial care', 'spa treatments', 'unisex salon', 'beauty gallery', 'salon portfolio'],
    authors: [{ name: 'Beauty Channel' }],
    openGraph: {
        title: 'Gallery - Beauty Channel | Professional Salon Services',
        description: 'Explore our gallery featuring professional bridal makeup, haircuts, facials, spa treatments, and more beauty services.',
        type: 'website',
        url: 'https://yourwebsite.com/gallery',
        images: [
            {
                url: 'https://yourwebsite.com/gallery-preview.jpg',
                width: 1200,
                height: 630,
                alt: 'Beauty Channel Gallery',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Gallery - Beauty Channel | Professional Salon Services',
        description: 'Explore our gallery featuring professional bridal makeup, haircuts, facials, spa treatments, and more beauty services.',
        images: ['https://yourwebsite.com/gallery-preview.jpg'],
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://yourwebsite.com/gallery',
    },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* You can add other components here */}
      <Navbar />
      <GalleryComponent />
      <Footer />
    </main>
  );
}