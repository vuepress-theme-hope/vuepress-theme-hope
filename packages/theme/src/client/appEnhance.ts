import { defineClientAppEnhance } from "@vuepress/client";
import { h } from "vue";

import { useScrollPromise } from "@theme-hope/composables";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app, router }) => {
  // compat with vuepress-plugin-comment2
  app.component("PageComment", ({ darkmode }: { darkmode?: boolean }) => {
    const CommentService = app.component("CommentService");

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return CommentService ? h(CommentService, { darkmode }) : null;
  });

  // register to inject styles
  app.component("CommonWrapper", CommonWrapper);
  app.component("HomePage", HomePage);
  app.component("NormalPage", NormalPage);

  // handle scrollBehavior with transition
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const scrollBehavior = router.options.scrollBehavior!;

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});
