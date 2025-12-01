import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/auth/login',
                permanent: false,
            },
            {
                source: '/dashboard',
                destination: '/dashboard/chats',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
