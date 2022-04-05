import { defineClientAppEnhance } from "@vuepress/client";

import Navbar from "@theme-hope/module/navbar/components/Navbar";

export default defineClientAppEnhance(({ app }) => {
  // register module root component
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Navbar", Navbar);
});
