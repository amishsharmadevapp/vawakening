
import type {NextConfig} from 'next';

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
        hostname: process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : undefined,
        port: '',
        pathname: '/storage/v1/object/public/**',
      }
    ].filter(pattern => pattern.hostname !== undefined) as NextConfig['images']['remotePatterns'], // Filter out undefined hostnames
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
