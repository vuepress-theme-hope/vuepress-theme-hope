import { defineClientAppSetup } from "@vuepress/client";

import { setupDarkMode } from "@theme-hope/composables";
import { setupSidebarItems } from "@theme-hope/module/sidebar/composables";

declare const ENABLE_BLOG: boolean;

export default defineClientAppSetup(() => {
  setupDarkMode();
  setupSidebarItems();

  if (ENABLE_BLOG)
    void import("@theme-hope/module/blog/composables").then(({ setupBlog }) => {
      setupBlog();
    });
});
