import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-scroll': 'react-scroll/modules/components/Link',
    },
  },
  css:{
    modules:{
      localsConvention: "camelCase",
    },
  }
})
