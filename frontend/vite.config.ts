import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const API_PATH = '/api' as const;
const DOCKER_BACKEND = 'http://api:3001';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            [API_PATH]: {
                target: DOCKER_BACKEND,
                changeOrigin: true,
                secure: false,
            },
        },
        host: '0.0.0.0',
    },
});
