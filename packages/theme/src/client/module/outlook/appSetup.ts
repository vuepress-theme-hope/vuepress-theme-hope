import { defineClientAppSetup } from "@vuepress/client";

import { setupDarkMode } from "@theme-hope/module/outlook/composables";

export default defineClientAppSetup(() => {
  setupDarkMode();
});
