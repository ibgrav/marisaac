import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  integrations: [],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
