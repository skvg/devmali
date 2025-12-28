import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for S3 deployment
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Configure trailing slash for S3 compatibility
  trailingSlash: true,
  
  // Configure asset prefix for CDN (optional)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://your-cloudfront-domain.com' : '',
  
  // Configure base path if deploying to a subdirectory (optional)
  // basePath: '/subdirectory',
  
  // Optimize for static hosting
  poweredByHeader: false,
  
  // Disable server-side features for static export
  experimental: {
    // Add any valid experimental features here if needed
  },
};

export default nextConfig;
