import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": `frame-ancestors 'self' https://app.contentful.com`
    }
  }
});
