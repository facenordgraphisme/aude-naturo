import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // La page d'accueil (slug « accueil » dans Sanity) n'est servie que sur « / »
      { source: "/accueil", destination: "/", permanent: true },
      // Ancien chemin Duda vers la version ASCII éventuellement tapée à la main
      { source: "/mentions-legales", destination: "/mentions-l%C3%A9gales", permanent: true },
    ];
  },
};

export default nextConfig;
