import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        svgr(),
    ],
    // server: {
    //     host: '0.0.0.0',
    //     port: 5173,
    //     origin: 'https://040495e9f4ad.ngrok-free.app:5173', // domain ngrok kamu
    //     hmr: {
    //         host: '040495e9f4ad.ngrok-free.app',
    //         protocol: 'wss',
    //         port: 5173,
    //         clientPort: 443,
    //     },
    // },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
});
