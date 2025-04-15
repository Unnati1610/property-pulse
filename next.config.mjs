/** @type {import('next').NextConfig} */
//1st configuration to add image from google account in our project profile
//2nd is to add images from cloudinary inour website
//we need to do this configuration to give access to use these domains
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
        ],
    },
};

export default nextConfig;
