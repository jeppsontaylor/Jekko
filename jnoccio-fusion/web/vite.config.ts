import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  base: "/dashboard/",
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:4317",
        ws: true,
      },
      "/health": "http://127.0.0.1:4317",
    },
  },
})
