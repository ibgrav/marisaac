import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  preview: {
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": `frame-ancestors 'self' https://app.contentful.com`
    }
  }
});
