const nextConfig = {
  basePath: process.env.VERCEL ? "" : "/portfolio-AhmedEwas",
  output: process.env.VERCEL ? undefined : "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
