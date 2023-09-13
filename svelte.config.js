import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    // https://kit.svelte.dev/docs/adapter-cloudflare
    adapter: adapter({
      routes: {
        include: ["/*"],
        exclude: ["<all>"]
      }
    })
    // alias: {
    //   "src/*": "src/*"
    // }
  }
};

export default config;
