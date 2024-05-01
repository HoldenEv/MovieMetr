/* @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/original/**",
      },
      {
        protocol: "https",
        hostname: "temp-bucket-h4i.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/myFolder/**",
      } 
    ],
  },
};

export default nextConfig;
