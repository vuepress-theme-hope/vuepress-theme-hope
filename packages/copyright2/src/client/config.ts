import { defineClientConfig } from "@vuepress/client";
import { setupCopyright } from "./composables";

export default defineClientConfig({
  setup: () => {
    setupCopyright();
  },
});
