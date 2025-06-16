
'use server';

import { redirect } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig'; // Import Firebase auth
// Supabase related imports are no longer needed for auth
// import { cookies } from 'next/headers';
// import { createServerActionClient } from '@supabase/auth-helpers-nextjs';


export async function logout() {
  // Firebase sign out is a client-side operation.
  // This server action will redirect, but actual sign-out state change
  // will be handled by Firebase SDK on the client.
  // For a full server-side session invalidation, you'd typically clear a session cookie
  // if you were managing sessions manually with Firebase Admin SDK.
  // With client-side Firebase SDK, the redirect is usually sufficient.
  console.log("Attempting to redirect to login after logout action.");
  redirect('/admin/login');
}
