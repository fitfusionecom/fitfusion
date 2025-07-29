/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "127.0.0.1",
      "dummyimage.com",
      "reliablecreations.s3.eu-north-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
