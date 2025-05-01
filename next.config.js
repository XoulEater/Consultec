/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "https://consultec-backend.vercel.app/api/:path*", // Proxy to Backend
            },
        ];
    },
};

module.exports = nextConfig;
