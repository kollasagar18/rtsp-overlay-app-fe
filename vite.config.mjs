import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
// ESM config file for Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
})
