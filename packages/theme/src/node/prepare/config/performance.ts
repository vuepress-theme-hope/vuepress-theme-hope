import { type App } from "@vuepress/core";

import { type ThemeStatus } from "../../config/index.js";
import { PERF_FOLDER } from "../../utils.js";

/**
 * @private
 */
export const preparePerformanceConfigFile = (
  app: App,
  { enableBlog, enableEncrypt, enableSlide }: ThemeStatus
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];
  const layouts = [];

  if (enableBlog) {
    imports.push(
      `import BloggerInfo from "${PERF_FOLDER}modules/blog/components/BloggerInfo";`,
      `import { setupBlog } from "${PERF_FOLDER}modules/blog/composables/index";`,
      `import BlogCategory from "${PERF_FOLDER}modules/blog/layouts/BlogCategory.js";`,
      `import BlogHome from "${PERF_FOLDER}modules/blog/layouts/BlogHome.js";`,
      `import BlogType from "${PERF_FOLDER}modules/blog/layouts/BlogType.js";`,
      `import Timeline from "${PERF_FOLDER}modules/blog/layouts/Timeline.js";`,
      `import "${PERF_FOLDER}modules/blog/styles/all.scss";`
    );

    enhances.push(`app.component("BloggerInfo", BloggerInfo);`);

    setups.push("setupBlog();");

    layouts.push("BlogCategory,", "BlogHome,", "BlogType,", "Timeline,");
  }

  if (enableEncrypt) {
    imports.push(
      `import GlobalEncrypt from "${PERF_FOLDER}modules/encrypt/components/GlobalEncrypt";`,
      `import LocalEncrypt from "${PERF_FOLDER}modules/encrypt/components/LocalEncrypt";`,
      `import "${PERF_FOLDER}modules/encrypt/styles/all.scss"`
    );

    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`
    );
  }

  if (enableSlide) {
    imports.push(`import Slide from "${PERF_FOLDER}layouts/Slide.js";`);
    layouts.push("Slide,");
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `import { defineClientConfig } from "@vuepress/client";

import HopeIcon from "${PERF_FOLDER}components/HopeIcon";
import Layout from "${PERF_FOLDER}layouts/Layout.js";
import NotFound from "${PERF_FOLDER}layouts/NotFound.js";

import { useScrollPromise } from "${PERF_FOLDER}composables/index";
import { injectDarkmode, setupDarkmode } from "${PERF_FOLDER}modules/outlook/composables/index";
import { setupSidebarItems } from "${PERF_FOLDER}modules/sidebar/composables/index";

import "${PERF_FOLDER}styles/all.scss";

${imports.join("\n")}

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // render icon for auto-catalog
    app.component("HopeIcon", HopeIcon);

${enhances.map((item) => `    ${item}`).join("\n")}
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
${setups.map((item) => `    ${item}`).join("\n")}
  },
  layouts: {
    Layout,
    NotFound,
${layouts.map((item) => `    ${item}`).join("\n")}
  }
});`
  );
};
