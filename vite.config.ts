import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'

import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, 'src') }
    ]
  }
})
