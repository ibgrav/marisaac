import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import ts from "./tsconfig.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  integrations: [tailwind()],
  image: {
    remotePatterns: [{ hostname: "**.amazonaws.com" }]
  },
  vite: {
    resolve: {
      alias: Object.entries(ts.compilerOptions.paths).map(([absolute, relative]) => ({
        find: absolute.replace("*", ""),
        replacement: path.resolve(__dirname, ts.compilerOptions.baseUrl, relative[0].replace("*", "")) + "/"
      }))
    }
  }
});
