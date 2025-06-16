import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext'; // Import LanguageProvider

// Static metadata is fine here, dynamic titles will be handled client-side in each page
export const metadata: Metadata = {
  title: 'Vivekananda Awakening Foundation',
  description: 'Bridging Science and Spiritualism for holistic well-being. A nonprofit dedicated to healthcare, education, social empowerment, sustainable development, and mental well-being.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#30475E', // Primary color
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang attribute will be set by LanguageProvider client-side
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/webicon.ico" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <LanguageProvider> {/* Wrap with LanguageProvider */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
