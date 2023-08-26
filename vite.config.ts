import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {

  dotenv.config({
    path: `.env.${mode}`
  })

  return {
    plugins: [react()],
    resolve: {
      alias: [
        { find: 'src', replacement: path.resolve(__dirname, 'src') }
      ]
    }
  }
})
