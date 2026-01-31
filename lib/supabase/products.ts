// import { supabase } from './client';

// export type ProductVariant = {
//   size?: string;
//   shade?: string;
//   color?: string;
//   code?: string;
//   price: number;
//   stock: number;
// };

// export type Product = {
//   id: string;
//   title: string;
//   slug: string;
//   category_id: string;
//   subcategory_id: string;
//   description: string;
//   features: string[];
//   actual_price: number;
//   selling_price: number;
//   discount_percentage: number;
//   stock: number;
//   variants: ProductVariant[];
//   images: string[];
//   is_active: boolean;
//   is_marked: boolean;
//   materials_info: string;
//   ingredients: string;
//   how_to_use: string;
//   skin_type: string;
//   meta_title?: string;
//   meta_description?: string;
//   created_at: string;
//   updated_at: string;
// };

// export type ProductWithDetails = Product & {
//   category_name: string;
//   category_slug: string;
//   subcategory_name: string;
//   subcategory_slug: string;
//   average_rating: number;
//   review_count: number;
//   reviews?: Review[];
// };

// export type Review = {
//   id: string;
//   user_id: string;
//   product_id: string;
//   rating: number;
//   comment: string;
//   is_verified: boolean;
//   helpful_count: number;
//   created_at: string;
//   user?: {
//     full_name: string;
//     email: string;
//   };
// };

// // Get all featured products (is_marked = true)
// export async function getFeaturedProducts() {
//   try {
//     const { data, error } = await supabase
//       .from('products')
//       .select(`
//         *,
//         product_categories!inner(name, slug),
//         product_subcategories(name, slug)
//       `)
//       .eq('is_marked', true)
//       .eq('is_active', true)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     // Fetch reviews for each product
//     const productsWithRatings = await Promise.all(
//       (data || []).map(async (product: any) => {
//         const { data: reviews } = await supabase
//           .from('reviews')
//           .select('rating')
//           .eq('product_id', product.id);

//         const reviewCount = reviews?.length || 0;
//         const averageRating = reviewCount > 0
//           ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
//           : 0;

//         return {
//           ...product,
//           category_name: product.product_categories?.name || '',
//           category_slug: product.product_categories?.slug || '',
//           subcategory_name: product.product_subcategories?.name || '',
//           subcategory_slug: product.product_subcategories?.slug || '',
//           average_rating: Math.round(averageRating * 10) / 10,
//           review_count: reviewCount,
//         };
//       })
//     );

//     return { data: productsWithRatings, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Get all products with optional filters
// export async function getProducts(filters?: {
//   category?: string;
//   subcategory?: string;
//   search?: string;
//   limit?: number;
//   offset?: number;
// }) {
//   try {
//     let query = supabase
//       .from('products')
//       .select(`
//         *,
//         product_categories!inner(name, slug),
//         product_subcategories(name, slug)
//       `, { count: 'exact' })
//       .eq('is_active', true);

//     // Apply filters
//     if (filters?.category && filters.category !== 'all') {
//       query = query.eq('product_categories.slug', filters.category);
//     }

//     if (filters?.subcategory) {
//       query = query.eq('product_subcategories.slug', filters.subcategory);
//     }

//     if (filters?.search) {
//       query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
//     }

//     // Pagination
//     if (filters?.limit) {
//       query = query.limit(filters.limit);
//     }

//     if (filters?.offset) {
//       query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
//     }

//     query = query.order('created_at', { ascending: false });

//     const { data, error, count } = await query;

//     if (error) throw error;

//     // Fetch reviews for each product
//     const productsWithRatings = await Promise.all(
//       (data || []).map(async (product: any) => {
//         const { data: reviews } = await supabase
//           .from('reviews')
//           .select('rating')
//           .eq('product_id', product.id);

//         const reviewCount = reviews?.length || 0;
//         const averageRating = reviewCount > 0
//           ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
//           : 0;

//         return {
//           ...product,
//           category_name: product.product_categories?.name || '',
//           category_slug: product.product_categories?.slug || '',
//           subcategory_name: product.product_subcategories?.name || '',
//           subcategory_slug: product.product_subcategories?.slug || '',
//           average_rating: Math.round(averageRating * 10) / 10,
//           review_count: reviewCount,
//         };
//       })
//     );

//     return { data: productsWithRatings, error: null, count };
//   } catch (error: any) {
//     return { data: null, error: error.message, count: 0 };
//   }
// }

// // Get single product by slug with full details
// export async function getProductBySlug(slug: string) {
//   try {
//     const { data: product, error } = await supabase
//       .from('products')
//       .select(`
//         *,
//         product_categories!inner(name, slug),
//         product_subcategories(name, slug)
//       `)
//       .eq('slug', slug)
//       .eq('is_active', true)
//       .single();

//     if (error) throw error;

//     // Fetch reviews with user details
//     const { data: reviews, error: reviewsError } = await supabase
//       .from('reviews')
//       .select(`
//         *,
//         profiles!inner(full_name, email)
//       `)
//       .eq('product_id', product.id)
//       .order('created_at', { ascending: false });

//     if (reviewsError) throw reviewsError;

//     const reviewCount = reviews?.length || 0;
//     const averageRating = reviewCount > 0
//       ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
//       : 0;

//     // Calculate rating distribution
//     const ratingDistribution = {
//       5: reviews?.filter(r => r.rating === 5).length || 0,
//       4: reviews?.filter(r => r.rating === 4).length || 0,
//       3: reviews?.filter(r => r.rating === 3).length || 0,
//       2: reviews?.filter(r => r.rating === 2).length || 0,
//       1: reviews?.filter(r => r.rating === 1).length || 0,
//     };

//     const productWithDetails: ProductWithDetails = {
//       ...product,
//       category_name: product.product_categories?.name || '',
//       category_slug: product.product_categories?.slug || '',
//       subcategory_name: product.product_subcategories?.name || '',
//       subcategory_slug: product.product_subcategories?.slug || '',
//       average_rating: Math.round(averageRating * 10) / 10,
//       review_count: reviewCount,
//       reviews: reviews?.map((r: any) => ({
//         ...r,
//         user: {
//           full_name: r.profiles?.full_name || 'Anonymous',
//           email: r.profiles?.email || '',
//         },
//       })),
//       rating_distribution: ratingDistribution,
//     };

//     return { data: productWithDetails, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Get product categories
// export async function getCategories() {
//   try {
//     const { data, error } = await supabase
//       .from('product_categories')
//       .select('*')
//       .eq('is_active', true)
//       .order('name', { ascending: true });

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Get product subcategories by category
// export async function getSubcategories(categoryId?: string) {
//   try {
//     let query = supabase
//       .from('product_subcategories')
//       .select('*')
//       .eq('is_active', true);

//     if (categoryId) {
//       query = query.eq('category_id', categoryId);
//     }

//     query = query.order('name', { ascending: true });

//     const { data, error } = await query;

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Add review for a product
// export async function addReview(params: {
//   productId: string;
//   userId: string;
//   rating: number;
//   comment: string;
// }) {
//   try {
//     const { data, error } = await supabase
//       .from('reviews')
//       .insert({
//         product_id: params.productId,
//         user_id: params.userId,
//         rating: params.rating,
//         comment: params.comment,
//       })
//       .select()
//       .single();

//     if (error) throw error;
//     return { data, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Get related products (same category, different product)
// export async function getRelatedProducts(productId: string, categoryId: string, limit: number = 3) {
//   try {
//     const { data, error } = await supabase
//       .from('products')
//       .select(`
//         *,
//         product_categories(name, slug),
//         product_subcategories(name, slug)
//       `)
//       .eq('category_id', categoryId)
//       .neq('id', productId)
//       .eq('is_active', true)
//       .limit(limit)
//       .order('created_at', { ascending: false });

//     if (error) throw error;

//     // Fetch reviews for each product
//     const productsWithRatings = await Promise.all(
//       (data || []).map(async (product: any) => {
//         const { data: reviews } = await supabase
//           .from('reviews')
//           .select('rating')
//           .eq('product_id', product.id);

//         const reviewCount = reviews?.length || 0;
//         const averageRating = reviewCount > 0
//           ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
//           : 0;

//         return {
//           ...product,
//           category_name: product.product_categories?.name || '',
//           category_slug: product.product_categories?.slug || '',
//           subcategory_name: product.product_subcategories?.name || '',
//           subcategory_slug: product.product_subcategories?.slug || '',
//           average_rating: Math.round(averageRating * 10) / 10,
//           review_count: reviewCount,
//         };
//       })
//     );

//     return { data: productsWithRatings, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }

// // Upload product image to Supabase Storage
// export async function uploadProductImage(file: File, productSlug: string) {
//   try {
//     const fileExt = file.name.split('.').pop();
//     const fileName = `${productSlug}-${Date.now()}.${fileExt}`;
//     const filePath = `${fileName}`;

//     const { error: uploadError } = await supabase.storage
//       .from('product-images')
//       .upload(filePath, file);

//     if (uploadError) throw uploadError;

//     // Get public URL
//     const { data } = supabase.storage
//       .from('product-images')
//       .getPublicUrl(filePath);

//     return { data: data.publicUrl, error: null };
//   } catch (error: any) {
//     return { data: null, error: error.message };
//   }
// }










import { supabase } from './client';

export type ProductVariant = {
  size?: string;
  shade?: string;
  color?: string;
  code?: string;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  title: string;
  slug: string;
  category_id: string;
  subcategory_id: string;
  description: string;
  features: string[];
  actual_price: number;
  selling_price: number;
  discount_percentage: number;
  stock: number;
  variants: ProductVariant[];
  images: string[];
  is_active: boolean;
  is_marked: boolean;
  materials_info: string;
  ingredients: string;
  how_to_use: string;
  skin_type: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string;
  updated_at: string;
};

export type ProductWithDetails = Product & {
  category_name: string;
  category_slug: string;
  subcategory_name: string;
  subcategory_slug: string;
  average_rating: number;
  review_count: number;
  reviews?: Review[];
};

export type Review = {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
  is_verified: boolean;
  helpful_count: number;
  created_at: string;
  user?: {
    full_name: string;
    email: string;
  };
};

// Get all featured products (is_marked = true)
export async function getFeaturedProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(name, slug),
        product_subcategories(name, slug)
      `)
      .eq('is_marked', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch reviews for each product
    const productsWithRatings = await Promise.all(
      (data || []).map(async (product: any) => {
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('product_id', product.id);

        const reviewCount = reviews?.length || 0;
        const averageRating = reviewCount > 0
          ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
          : 0;

        return {
          ...product,
          category_name: product.product_categories?.name || '',
          category_slug: product.product_categories?.slug || '',
          subcategory_name: product.product_subcategories?.name || '',
          subcategory_slug: product.product_subcategories?.slug || '',
          average_rating: Math.round(averageRating * 10) / 10,
          review_count: reviewCount,
        };
      })
    );

    return { data: productsWithRatings, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Get all products with optional filters
export async function getProducts(filters?: {
  category?: string;
  subcategory?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  try {
    let query = supabase
      .from('products')
      .select(`
        *,
        product_categories(name, slug),
        product_subcategories(name, slug)
      `, { count: 'exact' })
      .eq('is_active', true);

    // Apply category filter - FIXED
    if (filters?.category && filters.category !== 'all') {
      // First get the category id from slug
      const { data: categoryData } = await supabase
        .from('product_categories')
        .select('id')
        .eq('slug', filters.category)
        .single();
      
      if (categoryData) {
        query = query.eq('category_id', categoryData.id);
      }
    }

    if (filters?.subcategory) {
      // First get the subcategory id from slug
      const { data: subcategoryData } = await supabase
        .from('product_subcategories')
        .select('id')
        .eq('slug', filters.subcategory)
        .single();
      
      if (subcategoryData) {
        query = query.eq('subcategory_id', subcategoryData.id);
      }
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Pagination
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error, count } = await query;

    if (error) throw error;

    // Fetch reviews for each product
    const productsWithRatings = await Promise.all(
      (data || []).map(async (product: any) => {
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('product_id', product.id);

        const reviewCount = reviews?.length || 0;
        const averageRating = reviewCount > 0
          ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
          : 0;

        return {
          ...product,
          category_name: product.product_categories?.name || '',
          category_slug: product.product_categories?.slug || '',
          subcategory_name: product.product_subcategories?.name || '',
          subcategory_slug: product.product_subcategories?.slug || '',
          average_rating: Math.round(averageRating * 10) / 10,
          review_count: reviewCount,
        };
      })
    );

    return { data: productsWithRatings, error: null, count };
  } catch (error: any) {
    return { data: null, error: error.message, count: 0 };
  }
}

// Get single product by slug with full details
export async function getProductBySlug(slug: string) {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(name, slug),
        product_subcategories(name, slug)
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    // Fetch reviews with user details
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles(full_name, email)
      `)
      .eq('product_id', product.id)
      .order('created_at', { ascending: false });

    if (reviewsError) throw reviewsError;

    const reviewCount = reviews?.length || 0;
    const averageRating = reviewCount > 0
      ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
      : 0;

    // Calculate rating distribution
    const ratingDistribution = {
      5: reviews?.filter(r => r.rating === 5).length || 0,
      4: reviews?.filter(r => r.rating === 4).length || 0,
      3: reviews?.filter(r => r.rating === 3).length || 0,
      2: reviews?.filter(r => r.rating === 2).length || 0,
      1: reviews?.filter(r => r.rating === 1).length || 0,
    };

    const productWithDetails: any = {
      ...product,
      category_name: product.product_categories?.name || '',
      category_slug: product.product_categories?.slug || '',
      subcategory_name: product.product_subcategories?.name || '',
      subcategory_slug: product.product_subcategories?.slug || '',
      average_rating: Math.round(averageRating * 10) / 10,
      review_count: reviewCount,
      reviews: reviews?.map((r: any) => ({
        ...r,
        user: {
          full_name: r.profiles?.full_name || 'Anonymous',
          email: r.profiles?.email || '',
        },
      })),
      rating_distribution: ratingDistribution,
    };

    return { data: productWithDetails, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Get product categories
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .eq('is_active', true)
      .order('name', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Get product subcategories by category
export async function getSubcategories(categoryId?: string) {
  try {
    let query = supabase
      .from('product_subcategories')
      .select('*')
      .eq('is_active', true);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    query = query.order('name', { ascending: true });

    const { data, error } = await query;

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Add review for a product
export async function addReview(params: {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}) {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert({
        product_id: params.productId,
        user_id: params.userId,
        rating: params.rating,
        comment: params.comment,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Get related products (same category, different product)
export async function getRelatedProducts(productId: string, categoryId: string, limit: number = 3) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_categories(name, slug),
        product_subcategories(name, slug)
      `)
      .eq('category_id', categoryId)
      .neq('id', productId)
      .eq('is_active', true)
      .limit(limit)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Fetch reviews for each product
    const productsWithRatings = await Promise.all(
      (data || []).map(async (product: any) => {
        const { data: reviews } = await supabase
          .from('reviews')
          .select('rating')
          .eq('product_id', product.id);

        const reviewCount = reviews?.length || 0;
        const averageRating = reviewCount > 0
          ? reviews!.reduce((sum, r) => sum + r.rating, 0) / reviewCount
          : 0;

        return {
          ...product,
          category_name: product.product_categories?.name || '',
          category_slug: product.product_categories?.slug || '',
          subcategory_name: product.product_subcategories?.name || '',
          subcategory_slug: product.product_subcategories?.slug || '',
          average_rating: Math.round(averageRating * 10) / 10,
          review_count: reviewCount,
        };
      })
    );

    return { data: productsWithRatings, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

// Upload product image to Supabase Storage
export async function uploadProductImage(file: File, productSlug: string) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productSlug}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return { data: data.publicUrl, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}