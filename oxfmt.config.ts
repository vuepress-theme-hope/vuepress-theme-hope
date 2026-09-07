import { defineHopeConfig } from "oxc-config-hope/oxfmt";

export default defineHopeConfig({
  sortImports: {
    internalPattern: ["@internal/", "@temp/", "@theme-hope/"],
  },
  ignorePatterns: [
    // reveal.js slide pages are almost entirely VuePress-specific syntax
    // (`@slidestart`, `<!-- .slide: -->`, `<!-- .element: -->`) that oxfmt
    // cannot format correctly
    "demo/theme-blog/src/**/slide.md",
    "demo/theme-docs/src/**/slide.md",
  ],
});
