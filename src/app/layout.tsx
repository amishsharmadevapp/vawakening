import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { LanguageProvider } from '@/context/LanguageContext'; // Import LanguageProvider
import Script from 'next/script';
import Analytics from '@/components/Analytics';

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
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-4CYW7KGPBQ`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4CYW7KGPBQ', { page_path: window.location.pathname });
          `}
        </Script>
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning={true}>
        <LanguageProvider> {/* Wrap with LanguageProvider */}
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
          {/* Analytics route change tracker */}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
