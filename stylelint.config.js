import { defineHopeConfig } from "stylelint-config-hope";

export default defineHopeConfig({
  ignoreFiles: [
    "**/*.module.scss",
    "**/node_modules/**",
    "**/dist/**",
    "**/.vuepress/.cache/**",
    "**/.vuepress/.temp/**",
    "**/.vuepress/dist/**",
  ],
  rules: {
    "declaration-block-no-redundant-longhand-properties": true,
    "media-feature-range-notation": "prefix",
    "no-descending-specificity": null,
  },
  scss: true,
});
