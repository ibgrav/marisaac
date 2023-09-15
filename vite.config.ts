import { resolve } from "path";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import ts from "./tsconfig.json";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    alias: Object.entries(ts.compilerOptions.paths).map(([absolute, relative]) => ({
      find: absolute.replace("*", ""),
      replacement: resolve(__dirname, ts.compilerOptions.baseUrl, relative[0].replace("*", "")) + "/"
    }))
  }
});
