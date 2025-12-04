// Removed the direct type import from 'next' to avoid a
// "Cannot find module 'next'" TypeScript error when
// dependencies are not yet installed in the developer's env.

const nextConfig = {
  basePath: "/portfolio-AhmedEwas",
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
