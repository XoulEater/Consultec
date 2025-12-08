/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://consultec-backend.vercel.app/api/:path*", // Proxy to Backend
                //destination: "http://localhost:3001/api/:path*", // Proxy to Backend
                //destination: "https://consultec-backend-git-devjose-josea27s-projects.vercel.app/api/:path*"
            },
        ];
    },
};

module.exports = nextConfig;
