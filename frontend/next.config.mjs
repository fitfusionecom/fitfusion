/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "reliablecreations.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "fitfusion.fullstackartists.com",
      },
      {
        protocol: "https",
        hostname: "fitfusion-alpha.vercel.app",
      },
      {
        protocol: "https",
        hostname: "myckc.s3.us-east-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
