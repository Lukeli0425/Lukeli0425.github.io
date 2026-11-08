import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCitation from "rehype-citation";

import react from "@astrojs/react";

import astroExpressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  // Served from https://nubivlab.github.io/Blind-FlowSGS/ and mirrored at
  // https://lukeli0425.github.io/Blind-FlowSGS/ — both use the same base path.
  site: "https://nubivlab.github.io",
  base: "/Blind-FlowSGS",
  build: {
    // GitHub Pages runs Jekyll on this repo, and Jekyll drops directories that
    // start with an underscore. Astro's default "_astro" would 404 in production.
    assets: "astro-assets",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeCitation,
        {
          bibliography: "bibliography.bib",
          linkCitations: true,
        },
      ],
    ],
  },
  integrations: [
    icon(),
    astroExpressiveCode({
      styleOverrides: {
        borderRadius: "0.5rem",
        borderWidth: "0",
        codeBackground: ({ theme }) =>
          `var(--color-zinc-${theme.type === "dark" ? "800" : "200"})`,
        frames: {
          shadowColor: "transparent",
        },
      },
      themeCssSelector: (theme) =>
        theme.type === "dark" ? `[data-theme="dark"]` : `[data-theme="light"]`,
    }),
    mdx(),
    react(),
  ],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Noto Sans",
      cssVariable: "--font-noto-sans",
      weights: ["100 900"],
    },
  ],
  image: {
    responsiveStyles: true,
  },
});
