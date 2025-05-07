import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ThemeStatus } from "../config/index.js";
import { BUNDLE_FOLDER } from "../utils.js";

/**
 * @private
 */
export const prepareBundleConfigFile = (
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
    content: icon ? () =>[h(resolveComponent("VPIcon"), { icon, sizing: "both" }), title] : null,
    order: meta.order,
    index: meta.index,
  } : null;
});`);
  }

  if (enableBlog) {
    imports.push(
      `import { Blog, BloggerInfo, SocialMedias, setupBlog } from "${BUNDLE_FOLDER}/exports/blog.js";`,
      `import "${BUNDLE_FOLDER}/styles/blog/bundle.scss";`,
    );
    enhances.push(
      `app.component("BloggerInfo", BloggerInfo);`,
      `app.component("SocialMedias", SocialMedias);`,
    );
    setups.push("setupBlog();");
    layouts.push("Blog");
  }

  if (enableEncrypt) {
    imports.push(
      `import { GlobalEncrypt, LocalEncrypt } from "${BUNDLE_FOLDER}/exports/encrypt.js";`,
      `import "${BUNDLE_FOLDER}/styles/encrypt/bundle.scss"`,
    );

    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`,
    );
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `\
import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "${BUNDLE_FOLDER}/exports/base.js";

${imports.join("\n")}

import "${getModulePath("@vuepress/helper/colors.css", import.meta)}";
import "${getModulePath("@vuepress/helper/normalize.css", import.meta)}";
import "${getModulePath("@vuepress/helper/sr-only.css", import.meta)}";
import "${BUNDLE_FOLDER}/styles/bundle.scss";

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
