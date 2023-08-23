import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  plugins: [svelte()],
  preview: {
    port: 5173,
    headers: {
      "X-Frame-Options": "SAMEORIGIN",
      "Content-Security-Policy": `frame-ancestors 'self' https://app.contentful.com`
    }
  }
});
