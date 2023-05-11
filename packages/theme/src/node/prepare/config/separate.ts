import { createRequire } from "node:module";

import { type App } from "@vuepress/core";
import { path } from "@vuepress/utils";

import { type ThemeStatus } from "../../config/index.js";
import { CLIENT_FOLDER } from "../../utils.js";

const require = createRequire(import.meta.url);

/**
 * @private
 */
export const prepareSeparatedConfigFile = (
  app: App,
  { enableAutoCatalog, enableBlog, enableEncrypt, enableSlide }: ThemeStatus
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];
  const actions: string[] = [];
  const layouts = [];

  if (enableAutoCatalog) {
    imports.push(
      `import { HopeIcon } from "${CLIENT_FOLDER}export.js";`,
      `import { defineAutoCatalogIconComponent } from "${path.resolve(
        require.resolve("vuepress-plugin-auto-catalog/client")
      )}"`
    );
    actions.push(`defineAutoCatalogIconComponent(HopeIcon);`);
  }

  if (enableBlog) {
    imports.push(
      `import { BlogCategory, BlogHome, BlogType, BloggerInfo, Timeline, setupBlog } from "${CLIENT_FOLDER}modules/blog/export.js";`,
      `import "${CLIENT_FOLDER}modules/blog/styles/layout.scss";`
    );

    enhances.push(`app.component("BloggerInfo", BloggerInfo);`);

    setups.push("setupBlog();");

    layouts.push("BlogCategory,", "BlogHome,", "BlogType,", "Timeline,");
  }

  if (enableEncrypt) {
    imports.push(
      `import { GlobalEncrypt, LocalEncrypt } from "${CLIENT_FOLDER}modules/encrypt/export.js";`
    );
    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`
    );
  }

  if (enableSlide) {
    imports.push(
      `import Slide from "${path.resolve(
        require.resolve("vuepress-plugin-md-enhance/SlidePage")
      )}";`
    );
    layouts.push("Slide,");
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `\
import { defineClientConfig } from "@vuepress/client";

import { Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "${CLIENT_FOLDER}export.js";

${imports.join("\n")}

import "${CLIENT_FOLDER}styles/index.scss";

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

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
