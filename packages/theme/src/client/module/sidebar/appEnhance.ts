import { defineClientAppEnhance } from "@vuepress/client";

import Sidebar from "@theme-hope/module/sidebar/components/Sidebar";

export default defineClientAppEnhance(({ app }) => {
  // register module root component
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Sidebar", Sidebar);
});
