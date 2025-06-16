
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { ResourceDocument } from '@/types/resource';

export async function addResourceAction(formData: FormData) {
  const name = formData.get('name') as string;
  const short_description = formData.get('short_description') as string | null;
  const link = formData.get('link') as string;
  const thumbnail_url = formData.get('thumbnail_url') as string | null;
  const type = formData.get('type') as ResourceDocument['type'];
  const tags = formData.get('tags') as string | null;

  if (!name || !link || !type) {
    return { error: 'Name, link, and type are required.' };
  }

  try {
    const newResourceData: Omit<ResourceDocument, 'id' | 'created_at' | 'updated_at'> = {
      name,
      short_description: short_description || undefined,
      link,
      thumbnail_url: thumbnail_url || undefined,
      type,
      tags: tags || undefined,
    };

    const { data: insertedResource, error: insertError } = await supabase
      .from('resources')
      .insert(newResourceData)
      .select('id')
      .single();

    if (insertError || !insertedResource) {
      console.error('Error inserting resource:', insertError);
      throw new Error(insertError?.message || 'Failed to create resource data.');
    }

    revalidatePath('/admin/dashboard/resources');
    revalidatePath('/mythology-meditation'); // Revalidate public page
  } catch (error: any) {
    console.error('Error adding resource:', error);
    return { error: error.message || 'Failed to create resource.' };
  }
  redirect('/admin/dashboard/resources');
}

export async function updateResourceAction(id: string, formData: FormData) {
  const name = formData.get('name') as string;
  const short_description = formData.get('short_description') as string | null;
  const link = formData.get('link') as string;
  const thumbnail_url = formData.get('thumbnail_url') as string | null;
  const type = formData.get('type') as ResourceDocument['type'];
  const tags = formData.get('tags') as string | null;

  if (!name || !link || !type) {
    return { error: 'Name, link, and type are required.' };
  }

  try {
    const updatedData: Partial<Omit<ResourceDocument, 'id' | 'created_at' | 'updated_at'>> = {
      name,
      short_description: short_description || undefined,
      link,
      thumbnail_url: thumbnail_url || undefined,
      type,
      tags: tags || undefined,
      updated_at: new Date().toISOString(), // Manually set updated_at for Supabase if no trigger
    };

    const { error } = await supabase
      .from('resources')
      .update(updatedData)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/dashboard/resources');
    revalidatePath('/mythology-meditation');
    revalidatePath(`/mythology-meditation#${id}`); // Assuming IDs are used as anchors
  } catch (error: any) {
    console.error('Error updating resource:', error);
    return { error: error.message || 'Failed to update resource.' };
  }
  redirect('/admin/dashboard/resources');
}

export async function deleteResourceAction(id: string) {
  try {
    const { error } = await supabase.from('resources').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/dashboard/resources');
    revalidatePath('/mythology-meditation');
  } catch (error: any) {
    console.error('Error deleting resource:', error);
    return { error: error.message || 'Failed to delete resource.' };
  }
  redirect('/admin/dashboard/resources');
}

export async function getResourcesForAdmin(): Promise<ResourceDocument[]> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching resources for admin:', error);
    return [];
  }
  return data as ResourceDocument[];
}

export async function getResourceById(id: string): Promise<ResourceDocument | null> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { // PGRST116: "Searched for a single row, but found no rows" - not an error for us
      console.error(`Error fetching resource by id ${id}:`, error);
    }
    return null;
  }
  return data as ResourceDocument | null;
}

export async function getPublishedResources(): Promise<ResourceDocument[]> {
  // Alias for getResourcesForAdmin for now, can be differentiated later if needed
  return getResourcesForAdmin();
}
