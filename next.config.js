/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://consultec-backend.vercel.app/api/:path*", // Proxy to Backend
                //destination: "http://localhost:3001/api/:path*", // Proxy to Backend
            },
        ];
    },
};

module.exports = nextConfig;
