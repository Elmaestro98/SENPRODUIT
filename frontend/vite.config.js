import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000,
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
