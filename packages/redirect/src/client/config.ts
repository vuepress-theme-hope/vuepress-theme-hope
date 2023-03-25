import { defineClientConfig } from "@vuepress/client";

import { setupRedirect } from "./composables/redirect.js";

declare const __VUEPRESS_DEV__: boolean;

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_DEV__) void setupRedirect();
  },
});
