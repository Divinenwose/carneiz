import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',   // <-- this allows access from other containers (like nginx)
    port: 5173         // <-- make sure this matches your docker setup
  }
})
