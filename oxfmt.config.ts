import { defineHopeConfig } from "oxc-config-hope/oxfmt";

export default defineHopeConfig({
  sortImports: {
    internalPattern: ["@internal/", "@temp/", "@theme-hope/"],
  },
});
