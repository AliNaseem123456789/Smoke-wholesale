import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    allowedHosts: [
      "acetonic-humilis-lino.ngrok-free.dev", // The specific host from your error
      "localhost",
    ],
    // Alternative: set to true to allow ANY ngrok/tunnel host during dev
    // allowedHosts: true
  },
});
