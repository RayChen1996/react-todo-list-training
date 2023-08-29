import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base:'/react-todo-list-training/',
  base: process.env.NODE_ENV === 'production' ? '/react-todo-list-training/' : '/',
  // base: process.env.NODE_ENV === 'production' ? '/react-todo-list-training/' : '/',
  server: {
    proxy: {
      '/api': {
        target: 'https://todolist-api.hexschool.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
