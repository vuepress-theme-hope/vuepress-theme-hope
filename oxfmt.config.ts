import { config, defineConfig } from "oxc-config-hope/oxfmt";

export default defineConfig({
  extends: config,
  sortImports: {
    internalPattern: ["@internal/", "@temp/", "@theme-hope/"],
  },
});
