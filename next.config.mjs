/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "sleek-capybara-771.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
      },
      {
        protocol: "https",
        hostname: "giddy-goose-331.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
