
'use client'; // Required for useEffect and useRouter

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebaseConfig'; // Firebase auth instance
import { useToast } from '@/hooks/use-toast';

// export const metadata: Metadata = { // Metadata for layouts should be defined in page.tsx or route group layout
//   title: 'Admin Dashboard - Vivekananda Awakening Foundation',
//   robots: 'noindex, nofollow',
// };

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setIsAuthenticated(true);
        // Optional: Could add logic here to verify user role if needed from custom claims
      } else {
        setIsAuthenticated(false);
        // Store the current path to redirect back after login
        const loginUrl = new URL('/admin/login', window.location.origin);
        loginUrl.searchParams.set('redirectedFrom', pathname);
        router.push(loginUrl.toString());
      }
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router, pathname, toast]);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
            <p>Authenticating admin...</p>
        </div>
    );
  }

  if (!isAuthenticated) {
    // This case should ideally be handled by the redirect in useEffect,
    // but serves as a fallback or if redirect hasn't completed.
    // It might briefly show before redirecting.
    return (
         <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
            <p>Redirecting to login...</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simple header for admin section could go here */}
      {/* <header className="bg-muted p-4 shadow">Admin Section</header> */}
      {children}
    </div>
  );
}
