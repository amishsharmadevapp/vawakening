
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; 
import type { BlogPostDocument } from '@/types/blog';
import { stripHtml } from '@/lib/utils'; 


export async function addBlogPostAction(formData: FormData) {
  const author = "Admin"; 

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string | null; 
  const tags = formData.get('tags') as string | null;


  if (!title || !content) {
    return { error: 'Title and content are required.' };
  }

  let newPostId: string | undefined;

  try {
    const plainTextContent = stripHtml(content);
    const newPostData: Omit<BlogPostDocument, 'id' | 'created_at' | 'updated_at' | 'slug'> = {
      title,
      content, 
      author, 
      thumbnailUrl: thumbnailUrl || undefined, 
      tags: tags, 
      excerpt: plainTextContent.substring(0, 200) + (plainTextContent.length > 200 ? '...' : ''), 
    };
    
    const { data: insertedPost, error: insertError } = await supabase
      .from('blogs')
      .insert(newPostData)
      .select('id') 
      .single(); 

    if (insertError || !insertedPost) {
      console.error('Error inserting blog post:', insertError);
      throw new Error(insertError?.message || 'Failed to create blog post data.');
    }
    newPostId = insertedPost.id;

    const updatePayload: { slug: string } = {
      slug: newPostId, 
    };

    const { error: updateError } = await supabase
      .from('blogs')
      .update(updatePayload)
      .eq('id', newPostId);

    if (updateError) {
        console.error('Error updating post with slug:', updateError);
        throw new Error(updateError.message || 'Failed to finalize blog post with slug.');
    }

    revalidatePath('/admin/dashboard/blogs');
    revalidatePath('/blog'); 
    revalidatePath('/'); 
    revalidatePath(`/blog/${newPostId}`); 
  } catch (error: any) {
    console.error('Error adding blog post:', error);
    return { error: error.message || 'Failed to create blog post.' };
  }
  redirect('/admin/dashboard/blogs'); 
}

export async function updateBlogPostAction(id: string, formData: FormData) {
  const author = "Admin"; 

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const thumbnailUrl = formData.get('thumbnailUrl') as string | null;
  const tags = formData.get('tags') as string | null;


  if (!title || !content) {
    return { error: 'Title and content are required.' };
  }

  try {
    const plainTextContent = stripHtml(content);
    const updatedData: Partial<Omit<BlogPostDocument, 'id' | 'created_at' | 'slug' | 'updated_at'>> = {
      title,
      content, 
      author,
      thumbnailUrl: thumbnailUrl || undefined,
      tags: tags,
      excerpt: plainTextContent.substring(0, 200) + (plainTextContent.length > 200 ? '...' : ''), 
    };
    
    const { error } = await supabase
      .from('blogs')
      .update(updatedData)
      .eq('id', id);

    if (error) throw error;

    revalidatePath('/admin/dashboard/blogs');
    revalidatePath('/blog');
    revalidatePath('/');
    revalidatePath(`/blog/${id}`); 
  } catch (error: any) {
    console.error('Error updating blog post:', error);
    return { error: error.message || 'Failed to update blog post.' };
  }
  redirect('/admin/dashboard/blogs');
}

export async function deleteBlogPostAction(id: string) {
  try {
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    if (error) throw error;

    revalidatePath('/admin/dashboard/blogs');
    revalidatePath('/blog');
    revalidatePath('/');
  } catch (error: any) {
    console.error('Error deleting blog post:', error);
    return { error: error.message || 'Failed to delete blog post.' };
  }
  redirect('/admin/dashboard/blogs');
}

export async function getBlogPostsForAdmin(): Promise<BlogPostDocument[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts for admin:', error);
    return [];
  }
  return data.map(post => ({
    ...post,
    tags: post.tags || null, 
  })) as BlogPostDocument[];
}

export async function getBlogPostById(id: string): Promise<BlogPostDocument | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { 
      console.error(`Error fetching post by id ${id}:`, error);
    }
    return null;
  }
  if (data) {
     return {
      ...data,
      tags: data.tags || null,
    } as BlogPostDocument;
  }
  return null;
}

export async function getPublishedBlogPosts(): Promise<BlogPostDocument[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published blog posts:', error);
    return [];
  }
  return data.map(post => ({
    ...post,
    tags: post.tags || null,
  })) as BlogPostDocument[];
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPostDocument | null> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug) 
    .single();

  if (error) {
    if (error.code !== 'PGRST116') { 
        console.error(`Error fetching post by slug ${slug}:`, error);
    }
    return null;
  }
   if (data) {
    return {
      ...data,
      tags: data.tags || null,
    } as BlogPostDocument;
  }
  return null;
}

export async function getFeaturedBlogPosts(count: number): Promise<BlogPostDocument[]> {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(count);

  if (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
  return data.map(post => ({
    ...post,
    tags: post.tags || null,
  })) as BlogPostDocument[];
}
