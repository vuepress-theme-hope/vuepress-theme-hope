import { defineClientAppSetup } from "@vuepress/client";

import { setupSidebarItems } from "@theme-hope/module/sidebar/composables";

export default defineClientAppSetup(() => {
  setupSidebarItems();
});
