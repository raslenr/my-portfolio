import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // ⚠️ هنا نستخدم "/" بدل "/my-portfolio/" لأن Vercel ينشر المشروع على الجذر
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist", // المجلد النهائي للبناء
    sourcemap: false,
  },
}));
