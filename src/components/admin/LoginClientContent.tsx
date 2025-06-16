'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, FormEvent, useEffect } from 'react';
import { LogIn } from 'lucide-react';
import { auth } from '@/lib/firebaseConfig'; // Import Firebase auth
import { signInWithEmailAndPassword, onAuthStateChanged, type User } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export default function LoginClientContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start true to check auth state
  const { toast } = useToast();
  const { t } = useLanguage();
  const redirectTo = searchParams.get('redirectTo') || '/admin/dashboard';
  
  const redirectedFrom = searchParams.get('redirectedFrom');
  // Target /admin/dashboard/blogs as the main admin area after login
  const targetRedirectPath = redirectedFrom && redirectedFrom.startsWith('/admin/dashboard') ? redirectedFrom : '/admin/dashboard/blogs';


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        // User is signed in, redirect to dashboard/blogs
        router.push(targetRedirectPath);
      } else {
        // No user is signed in.
        setIsLoading(false); // Allow rendering login form
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router, targetRedirectPath]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log('Attempting login with email:', email); // Log email for debugging

    if (!email || !password) {
      setError('Email and password are required.');
      setIsLoading(false);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Email and password are required.',
      });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged in useEffect will handle the redirect, but we can push optimistically
      toast({
        title: 'Login Successful',
        description: 'Redirecting to dashboard...',
      });
      router.push(targetRedirectPath); // Redirect immediately on success
    } catch (e: any) {
      console.error('Firebase Sign-In Error:', e);
      let errorMessage = 'Invalid login credentials. Please try again.';
      if (e.code) {
        switch (e.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential': // Common error code for wrong email/password
            errorMessage = 'Invalid email or password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          // Add other Firebase auth error codes as needed
          // e.g. auth/too-many-requests
          default:
            errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
      setError(errorMessage);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && !error) { // Only show loading if not actively showing an error from initial auth check
    return (
        <div className="flex items-center justify-center min-h-screen bg-muted">
            <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-sm shadow-xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl text-primary">Admin Portal</CardTitle>
            <CardDescription>{t('login_subtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            {redirectedFrom && (
                <input type="hidden" name="redirectedFrom" value={redirectedFrom} />
            )}
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? 'Logging in...' : <><LogIn className="mr-2 h-4 w-4" /> {t('login_button')}</>}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 