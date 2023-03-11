import { createRequire } from "node:module";

import { type App } from "@vuepress/core";

import { type ThemeStatus } from "../../config/index.js";
import { PERF_FOLDER } from "../../utils.js";

const require = createRequire(import.meta.url);

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
      `import { BlogCategory, BlogHome, BlogType, BloggerInfo, Timeline, setupBlog } from "${PERF_FOLDER}modules/blog/export";`,
      `import "${PERF_FOLDER}modules/blog/styles/all.scss";`
    );

    enhances.push(`app.component("BloggerInfo", BloggerInfo);`);

    setups.push("setupBlog();");

    layouts.push("BlogCategory,", "BlogHome,", "BlogType,", "Timeline,");
  }

  if (enableEncrypt) {
    imports.push(
      `import { GlobalEncrypt, LocalEncrypt } from "${PERF_FOLDER}modules/encrypt/export";`,
      `import "${PERF_FOLDER}modules/encrypt/styles/all.scss"`
    );

    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`
    );
  }

  if (enableSlide) {
    imports.push(
      `import Slide from "${require.resolve(
        "vuepress-plugin-md-enhance/SlidePage"
      )}";`
    );
    layouts.push("Slide,");
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";

import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "${PERF_FOLDER}export.js";

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
