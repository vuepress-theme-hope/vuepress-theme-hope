import { type App } from "@vuepress/core";

import { type ThemeStatus } from "../config/status.js";
import { CLIENT_FOLDER } from "../utils.js";

/**
 * @private
 */
export const prepareConfigFile = (
  app: App,
  { enableBlog, enableEncrypt, enableSlide }: ThemeStatus
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];
  const layouts = [];

  if (enableBlog) {
    imports.push(
      `import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo";`,
      `import { setupBlog } from "@theme-hope/modules/blog/composables/index";`,
      `import BlogCategory from "${CLIENT_FOLDER}modules/blog/layouts/BlogCategory.js";`,
      `import BlogHome from "${CLIENT_FOLDER}modules/blog/layouts/BlogHome.js";`,
      `import BlogType from "${CLIENT_FOLDER}modules/blog/layouts/BlogType.js";`,
      `import Timeline from "${CLIENT_FOLDER}modules/blog/layouts/Timeline.js";`,
      `import "${CLIENT_FOLDER}modules/blog/styles/layout.scss";`
    );

    enhances.push(`app.component("BloggerInfo", BloggerInfo);`);

    setups.push("setupBlog();");

    layouts.push("BlogCategory,", "BlogHome,", "BlogType,", "Timeline,");
  }

  if (enableEncrypt) {
    imports.push(
      `import GlobalEncrypt from "@theme-hope/modules/encrypt/components/GlobalEncrypt";`,
      `import LocalEncrypt from "@theme-hope/modules/encrypt/components/LocalEncrypt";`
    );
    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`
    );
  }

  if (enableSlide) {
    imports.push(`import Slide from "${CLIENT_FOLDER}layouts/Slide.js";`);
    layouts.push("Slide,");
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `import { defineClientConfig } from "@vuepress/client";

import HopeIcon from "@theme-hope/components/HopeIcon";
import Layout from "${CLIENT_FOLDER}layouts/Layout.js";
import NotFound from "${CLIENT_FOLDER}layouts/NotFound.js";

import { useScrollPromise } from "@theme-hope/composables/index";
import { injectDarkmode, setupDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { setupSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import "${CLIENT_FOLDER}styles/index.scss";

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
