
import type {NextConfig} from 'next';

// Diagnostic log: Check if the Supabase URL environment variable is accessible here
// console.log('[next.config.ts] Value of process.env.NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // For GitHub raw image URLs
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'github.com', // For other GitHub images if needed
        port: '',
        pathname: '/**',
      },
      { // Ensure your Supabase project hostname is included if you ever use Supabase storage for other images
        protocol: 'https',
        // Attempt to derive hostname from NEXT_PUBLIC_SUPABASE_URL
        // If NEXT_PUBLIC_SUPABASE_URL is undefined, this will result in `undefined` hostname
        // and the pattern will be filtered out, which is safe.
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : undefined,
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    // Filter out any patterns where hostname ended up undefined (e.g., if SUPABASE_URL was missing)
    ].filter(pattern => pattern.hostname !== undefined) as NextConfig['images']['remotePatterns'],
  },
  experimental: {
    allowedDevOrigins: [ // Add your specific cloud workstation domains if needed
      // Example: 'your-dev-domain.cloudworkstations.dev'
      '6000-firebase-studio-1749914785375.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev',
      '9000-firebase-studio-1749914785375.cluster-fkltigo73ncaixtmokrzxhwsfc.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;
