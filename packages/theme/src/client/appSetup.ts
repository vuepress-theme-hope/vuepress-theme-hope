import { defineClientAppSetup } from "@vuepress/client";

import { setupDarkMode } from "@theme-hope/composables";
import { setupSidebarItems } from "@theme-hope/module/sidebar/composables";

export default defineClientAppSetup(() => {
  setupDarkMode();
  setupSidebarItems();
});
