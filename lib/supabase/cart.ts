// lib/supabase/cart.ts - Cart and Wishlist operations

import { supabase } from './client';

// Cart Operations
export async function getCartItems(userId: string) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        quantity,
        variant,
        created_at,
        product_id,
        products (
          id,
          title,
          slug,
          selling_price,
          actual_price,
          images,
          stock
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function addToCart(params: {
  userId: string;
  productId: string;
  quantity: number;
  variant?: string | null;
}) {
  try {
    // Check if item already exists
    const { data: existing } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', params.userId)
      .eq('product_id', params.productId)
      .maybeSingle();

    if (existing) {
      // Update quantity
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + params.quantity })
        .eq('id', existing.id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } else {
      // Insert new item
      const { data, error } = await supabase
        .from('cart')
        .insert({
          user_id: params.userId,
          product_id: params.productId,
          quantity: params.quantity,
          variant: params.variant,
        })
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    }
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function updateCartItemQuantity(cartItemId: string, quantity: number) {
  try {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function clearCart(userId: string) {
  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

// Wishlist Operations
export async function getWishlistItems(userId: string) {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .select(`
        id,
        created_at,
        product_id,
        products (
          id,
          title,
          slug,
          selling_price,
          actual_price,
          discount_percentage,
          images,
          stock
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function addToWishlist(userId: string, productId: string) {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .insert({
        user_id: userId,
        product_id: productId,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error: any) {
    return { data: null, error: error.message };
  }
}

export async function removeFromWishlist(userId: string, productId: string) {
  try {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function isInWishlist(userId: string, productId: string) {
  try {
    const { data, error } = await supabase
      .from('wishlist')
      .select('id')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle();

    if (error) throw error;
    return { exists: !!data, error: null };
  } catch (error: any) {
    return { exists: false, error: error.message };
  }
}