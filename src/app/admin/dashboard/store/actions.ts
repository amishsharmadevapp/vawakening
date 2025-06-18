
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { StoreProductDocument, StockNotificationRequest } from '@/types/store';

export async function addStoreProductAction(formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const priceString = formData.get('price') as string;
  const thumbnail_url = formData.get('thumbnail_url') as string | null;
  const in_stock = formData.get('in_stock') === 'on'; // Checkbox value is 'on' or null
  const data_ai_hint = formData.get('data_ai_hint') as string | null;

  if (!name || !priceString) {
    return { error: 'Product name and price are required.' };
  }

  const price = parseFloat(priceString);
  if (isNaN(price) || price < 0) {
    return { error: 'Invalid price format.' };
  }

  try {
    const newProductData: Omit<StoreProductDocument, 'id' | 'created_at' | 'updated_at'> = {
      name,
      description: description || undefined,
      price,
      thumbnail_url: thumbnail_url || undefined,
      in_stock,
      data_ai_hint: data_ai_hint || undefined,
    };

    const { error } = await supabase.from('store_products').insert(newProductData);

    if (error) {
      console.error('Error inserting store product:', error);
      throw new Error(error.message || 'Failed to create store product.');
    }

    revalidatePath('/admin/dashboard/store');
    revalidatePath('/store'); // Revalidate public store page
  } catch (error: any) {
    return { error: error.message || 'Failed to create store product.' };
  }
  redirect('/admin/dashboard/store');
}

export async function updateStoreProductAction(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string | null;
  const priceString = formData.get('price') as string;
  const thumbnail_url = formData.get('thumbnail_url') as string | null;
  const in_stock = formData.get('in_stock') === 'on';
  const data_ai_hint = formData.get('data_ai_hint') as string | null;

  if (!name || !priceString) {
    return { error: 'Product name and price are required.' };
  }
  const price = parseFloat(priceString);
  if (isNaN(price) || price < 0) {
    return { error: 'Invalid price format.' };
  }

  try {
    const updatedData: Partial<Omit<StoreProductDocument, 'id' | 'created_at' | 'updated_at'>> = {
      name,
      description: description || undefined,
      price,
      thumbnail_url: thumbnail_url || undefined,
      in_stock,
      data_ai_hint: data_ai_hint || undefined,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('store_products').update(updatedData).eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/dashboard/store');
    revalidatePath('/store');
    revalidatePath(`/store#product-${id}`);
  } catch (error: any) {
    return { error: error.message || 'Failed to update store product.' };
  }
  redirect('/admin/dashboard/store');
}

export async function deleteStoreProductAction(id: string) {
  try {
    const { error } = await supabase.from('store_products').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/dashboard/store');
    revalidatePath('/store');
  } catch (error: any) {
    return { error: error.message || 'Failed to delete store product.' };
  }
  redirect('/admin/dashboard/store');
}

export async function toggleStoreProductStockAction(id: string, currentState: boolean) {
  try {
    const { error } = await supabase
      .from('store_products')
      .update({ in_stock: !currentState, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) throw error;

    // If product is now in stock, this is where you might trigger notifications.
    // For now, we'll just revalidate paths.
    // if (!currentState === true) { /* Product became in_stock */ }

    revalidatePath('/admin/dashboard/store');
    revalidatePath('/store');
    revalidatePath(`/store#product-${id}`);
    return { success: true, newState: !currentState };
  } catch (error: any) {
    console.error('Error toggling stock status:', error);
    return { error: error.message || 'Failed to toggle stock status.' };
  }
}


export async function getStoreProductsForAdmin(): Promise<StoreProductDocument[]> {
  const { data, error } = await supabase
    .from('store_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching store products for admin:', error);
    return [];
  }
  return data as StoreProductDocument[];
}

export async function getStoreProductById(id: string): Promise<StoreProductDocument | null> {
  const { data, error } = await supabase
    .from('store_products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching store product by id ${id}:`, error);
    }
    return null;
  }
  return data as StoreProductDocument | null;
}

export async function getPublishedStoreProducts(): Promise<StoreProductDocument[]> {
  const { data, error } = await supabase
    .from('store_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published store products:', error);
    return [];
  }
  return data as StoreProductDocument[];
}

// Action for "Notify Me"
export async function addStockNotificationRequestAction(productId: string, email: string): Promise<{ success?: boolean; error?: string, message?: string }> {
  if (!productId || !email) {
    return { error: "Product ID and email are required." };
  }
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email format." };
  }

  try {
    // Check if a request for this product and email already exists
    const { data: existingRequest, error: fetchError } = await supabase
      .from('product_stock_notifications')
      .select('id')
      .eq('product_id', productId)
      .eq('user_email', email)
      .maybeSingle();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found, which is fine here
      throw fetchError;
    }

    if (existingRequest) {
      return { success: true, message: "You're already on the notification list for this product." };
    }

    const newRequest: Omit<StockNotificationRequest, 'id' | 'created_at'> = {
      product_id: productId,
      user_email: email,
    };
    const { error: insertError } = await supabase.from('product_stock_notifications').insert(newRequest);

    if (insertError) {
      console.error('Error inserting stock notification request:', insertError);
      throw new Error(insertError.message || 'Failed to submit notification request.');
    }
    
    revalidatePath(`/store#product-${productId}`); // Revalidate relevant product on store page
    return { success: true, message: "We'll notify you when this product is back in stock!" };
  } catch (error: any) {
    return { error: error.message || 'Failed to submit notification request.' };
  }
}
