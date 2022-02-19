import { defineClientAppEnhance } from "@vuepress/client";
import { h } from "vue";

import Navbar from "@theme-hope/module/navbar/components/Navbar";

export default defineClientAppEnhance(({ app }) => {
  // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
  app.component("NavbarSearch", () => {
    const SearchComponent =
      app.component("Docsearch") || app.component("SearchBox");

    return SearchComponent ? h(SearchComponent) : null;
  });

  // register module root component
  // eslint-disable-next-line vue/multi-word-component-names
  app.component("Navbar", Navbar);
});
