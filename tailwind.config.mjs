/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        botoncito: "#5E60A9",
        botoncito_2: "#FF7F50",
        cardHover: "#13113C",
        astroColor: "#ff5c01",
        reactColor: "#5ed3f3",
        tailwindColor: "#3ebff8",
        linkGreen: "#9DBA96",
      },
    },
  },
  plugins: [],
};
