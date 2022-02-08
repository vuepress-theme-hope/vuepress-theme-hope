import { defineClientAppSetup } from "@vuepress/client";

import { setupBlog } from "@theme-hope/module/blog/composables";

export default defineClientAppSetup(() => {
  setupBlog();
});
