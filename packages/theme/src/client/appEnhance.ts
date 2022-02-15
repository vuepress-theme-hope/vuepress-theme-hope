import { defineClientAppEnhance } from "@vuepress/client";
import { h } from "vue";

import { useScrollPromise } from "@theme-hope/composables";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";

import type { RouterScrollBehavior } from "vue-router";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app, router }) => {
  // compat with @vuepress/plugin-docsearch and @vuepress/plugin-search
  app.component("NavbarSearch", () => {
    const SearchComponent =
      app.component("Docsearch") || app.component("SearchBox");

    return SearchComponent ? h(SearchComponent) : null;
  });

  // compat with vuepress-plugin-comment2
  app.component("PageComment", () => {
    const CommentService = app.component("CommentService");

    return CommentService ? h(CommentService) : null;
  });

  // register to inject styles
  app.component("CommonWrapper", CommonWrapper);
  app.component("HomePage", HomePage);
  app.component("NormalPage", NormalPage);

  // handle scrollBehavior with transition
  const scrollBehavior = router.options.scrollBehavior as RouterScrollBehavior;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
