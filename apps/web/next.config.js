/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lpesnbfbtzxdzycpoagm.supabase.co', // الدومين الخاص بك
        port: '',
        pathname: '/storage/v1/object/public/**', // المسار المسموح بالتحميل منه
      },
    ],
  },
};

export default nextConfig;
