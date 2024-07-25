import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()

type ViteConfigInput = {
  mode: string
  command: string
}

// https://vitejs.dev/config/
export default (args: ViteConfigInput) => {
  const generateScopedName =
    args.mode === 'production'
      ? '[hash:base64:8]'
      : '[path][name]__[local]--[hash:base64:5]'

  return defineConfig({
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
      __EXTERNAL_SERVER_URL__: JSON.stringify(process.env.EXTERNAL_SERVER_URL),
      __INTERNAL_SERVER_URL__: JSON.stringify(process.env.INTERNAL_SERVER_URL),
      __SERVER_PORT__: process.env.SERVER_PORT,
    },
    ssr: {
      format: 'cjs',
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName,
      },
    },
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: '/src' }],
    },
    build: {
      outDir: path.join(__dirname, 'dist/client'),
      assetsDir: 'assets',
    },
  })
}
