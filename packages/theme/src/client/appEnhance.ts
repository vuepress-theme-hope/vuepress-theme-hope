import { defineClientAppEnhance } from "@vuepress/client";
import { h } from "vue";
import { useScrollPromise } from "./composables";

import type { RouterScrollBehavior } from "vue-router";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app, router }) => {
  // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
  app.component("NavbarSearch", () => {
    const SearchComponent =
      app.component("Docsearch") || app.component("SearchBox");

    return SearchComponent ? h(SearchComponent) : null;
  });

  // handle scrollBehavior with transition
  const scrollBehavior = router.options.scrollBehavior as RouterScrollBehavior;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
