/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        pink: "rgb(var(--c-pink))",
        purple: "rgb(var(--c-purple))",
        wine: "rgb(var(--c-wine))",
        vanilla: "rgb(var(--c-vanilla))",
        brown: "rgb(var(--c-brown))",
        drab: "rgb(var(--c-drab))",
      },
      backgroundImage: {
        "home-gradient": "linear-gradient(var(--bg-home-gradient))",
      },
    },
  },
  plugins: [],
};
