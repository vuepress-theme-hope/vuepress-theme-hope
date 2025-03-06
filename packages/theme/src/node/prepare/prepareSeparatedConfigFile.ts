import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ThemeStatus } from "../config/index.js";
import { CLIENT_FOLDER } from "../utils.js";

/**
 * @private
 */
export const prepareSeparatedConfigFile = (
  app: App,
  { enableCatalog, enableBlog, enableEncrypt }: ThemeStatus,
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];
  const actions: string[] = [];
  const layouts = [];

  if (enableCatalog) {
    imports.push(
      `import { defineCatalogInfoGetter } from "${getModulePath(
        "@vuepress/plugin-catalog/client",
        import.meta,
      )}"`,
      `import { h } from "vue"`,
      `import { resolveComponent } from "vue"`,
    );
    actions.push(`\
defineCatalogInfoGetter((meta) => {
  const title = meta.title;
  const shouldIndex = meta.index ?? true;
  const icon = meta.icon;

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});`);
  }

  if (enableBlog) {
    imports.push(
      `import { BlogCategory, BlogHome, BlogType, BloggerInfo, SocialMedias, Timeline, setupBlog } from "${CLIENT_FOLDER}modules/blog/export.js";`,
      `import "${CLIENT_FOLDER}modules/blog/styles/layout.scss";`,
    );

    enhances.push(
      `app.component("BloggerInfo", BloggerInfo);`,
      `app.component("SocialMedias", SocialMedias);`,
    );

    setups.push("setupBlog();");

    layouts.push("BlogCategory", "BlogHome", "BlogType", "Timeline");
  }

  if (enableEncrypt) {
    imports.push(
      `import { GlobalEncrypt, LocalEncrypt } from "${CLIENT_FOLDER}modules/encrypt/export.js";`,
    );
    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`,
    );
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `\
import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "${CLIENT_FOLDER}export.js";

${imports.join("\n")}

import "${getModulePath("@vuepress/helper/colors.css", import.meta)}";
import "${getModulePath("@vuepress/helper/normalize.css", import.meta)}";
import "${getModulePath("@vuepress/helper/sr-only.css", import.meta)}";
import "${CLIENT_FOLDER}styles/index.scss";

${actions.join("\n")}

export default {
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await scrollPromise.wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkMode(app);

${enhances.map((item) => `    ${item}`).join("\n")}
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
${setups.map((item) => `    ${item}`).join("\n")}
  },
  layouts: {
    Layout,
    NotFound,
${layouts.map((item) => `    ${item},`).join("\n")}
  }
};
`,
  );
};
