// types/gallery.ts

export interface GalleryMedia {
  id: string;
  title: string | null;
  description: string | null;
  media_url: string;
  media_type: 'image' | 'video';
  file_name: string | null;
  file_size: number | null;
  thumbnail_url: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  display_order: number;
  tags: string[] | null;
  uploaded_by: string | null;
}