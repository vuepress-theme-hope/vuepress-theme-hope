import { defineClientAppEnhance } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import { useScrollPromise } from "@theme-hope/composables";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app, router }) => {
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
