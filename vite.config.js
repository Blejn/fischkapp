import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@images": "/src/assets/images", // Dodaj alias do folderu ze zdjęciami
    },
  },
});
