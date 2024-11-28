import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api-rsvp.elyricm.cloud",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});