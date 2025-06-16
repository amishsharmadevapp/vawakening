
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import type { ProgramDocument } from '@/types/program';

export async function addProgramAction(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const long_description = formData.get('long_description') as string | null;
  const thumbnail_url = formData.get('thumbnail_url') as string | null;
  const learn_more_url = formData.get('learn_more_url') as string | null;
  const category = formData.get('category') as string; // This should be required
  const icon_name = formData.get('icon_name') as string | null;
  const tags = formData.get('tags') as string | null;
  const data_ai_hint = formData.get('data_ai_hint') as string | null;

  if (!title || !category) {
    return { error: 'Title and category are required.' };
  }

  try {
    const newProgramData: Omit<ProgramDocument, 'id' | 'created_at' | 'updated_at'> = {
      title,
      description: description || undefined,
      long_description: long_description || undefined,
      thumbnail_url: thumbnail_url || undefined,
      learn_more_url: learn_more_url || undefined,
      category,
      icon_name: icon_name || undefined,
      tags: tags || undefined,
      data_ai_hint: data_ai_hint || undefined,
    };

    const { data: insertedProgram, error: insertError } = await supabase
      .from('programs')
      .insert(newProgramData)
      .select('id')
      .single();

    if (insertError || !insertedProgram) {
      console.error('Error inserting program:', insertError);
      throw new Error(insertError?.message || 'Failed to create program data.');
    }

    revalidatePath('/admin/dashboard/programs');
    revalidatePath('/programs'); // Revalidate public programs page
  } catch (error: any) {
    console.error('Error adding program:', error);
    return { error: error.message || 'Failed to create program.' };
  }
  redirect('/admin/dashboard/programs');
}

export async function updateProgramAction(id: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string | null;
  const long_description = formData.get('long_description') as string | null;
  const thumbnail_url = formData.get('thumbnail_url') as string | null;
  const learn_more_url = formData.get('learn_more_url') as string | null;
  const category = formData.get('category') as string;
  const icon_name = formData.get('icon_name') as string | null;
  const tags = formData.get('tags') as string | null;
  const data_ai_hint = formData.get('data_ai_hint') as string | null;

  if (!title || !category) {
    return { error: 'Title and category are required.' };
  }

  try {
    const updatedData: Partial<Omit<ProgramDocument, 'id' | 'created_at' | 'updated_at'>> = {
      title,
      description: description || undefined,
      long_description: long_description || undefined,
      thumbnail_url: thumbnail_url || undefined,
      learn_more_url: learn_more_url || undefined,
      category,
      icon_name: icon_name || undefined,
      tags: tags || undefined,
      data_ai_hint: data_ai_hint || undefined,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from('programs')
      .update(updatedData)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/dashboard/programs');
    revalidatePath('/programs');
    revalidatePath(`/programs#${id}`); // Assuming IDs might be used as anchors
  } catch (error: any) {
    console.error('Error updating program:', error);
    return { error: error.message || 'Failed to update program.' };
  }
  redirect('/admin/dashboard/programs');
}

export async function deleteProgramAction(id: string) {
  try {
    const { error } = await supabase.from('programs').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/dashboard/programs');
    revalidatePath('/programs');
  } catch (error: any) {
    console.error('Error deleting program:', error);
    return { error: error.message || 'Failed to delete program.' };
  }
  redirect('/admin/dashboard/programs');
}

export async function getProgramsForAdmin(): Promise<ProgramDocument[]> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching programs for admin:', error);
    return [];
  }
  return data as ProgramDocument[];
}

export async function getProgramById(id: string): Promise<ProgramDocument | null> {
  const { data, error } = await supabase
    .from('programs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error(`Error fetching program by id ${id}:`, error);
    }
    return null;
  }
  return data as ProgramDocument | null;
}

export async function getPublishedPrograms(): Promise<ProgramDocument[]> {
  // Alias for getProgramsForAdmin for now, can be differentiated later if needed (e.g. a 'published' flag)
  return getProgramsForAdmin();
}
