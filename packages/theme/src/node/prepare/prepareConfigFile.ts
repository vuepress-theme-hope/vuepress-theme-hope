import { getModulePath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import type { ThemeStatus } from "../config/index.js";
import type { ThemeBehaviorOptions } from "../typings/index.js";
import { BUNDLE_FOLDER, CLIENT_FOLDER } from "../utils.js";

/**
 * @private
 */
export const prepareConfigFile = (
  app: App,
  { enableCatalog, enableBlog, enableEncrypt, enableIcon }: ThemeStatus,
  { custom }: ThemeBehaviorOptions,
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];
  const actions: string[] = [];
  const layouts = [];

  const targetFolder = custom ? CLIENT_FOLDER : BUNDLE_FOLDER;

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
      `import { Blog, BloggerInfo, SocialMedias, setupBlog } from "${targetFolder}/exports/blog.js";`,
      `import "${targetFolder}/styles/blog/${custom ? "layout" : "bundle"}.scss";`,
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
      `import { GlobalEncrypt, LocalEncrypt } from "${targetFolder}/exports/encrypt.js";`,
    );

    if (!custom)
      imports.push(`import "${targetFolder}/styles/encrypt/bundle.scss"`);

    enhances.push(
      `app.component("GlobalEncrypt", GlobalEncrypt);`,
      `app.component("LocalEncrypt", LocalEncrypt);`,
    );
  }

  if (!enableIcon) {
    imports.push(
      `import noopComponent from "${getModulePath(
        "@vuepress/helper/noopComponent",
        import.meta,
      )}"`,
    );
    enhances.push(`app.component("VPIcon", noopComponent);`);
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `\
import { Layout, NotFound, injectDarkMode, setupDarkMode, setupSidebarItems, scrollPromise } from "${targetFolder}/exports/base.js";

${imports.join("\n")}

import "${getModulePath("@vuepress/helper/colors.css", import.meta)}";
import "${getModulePath("@vuepress/helper/normalize.css", import.meta)}";
import "${getModulePath("@vuepress/helper/sr-only.css", import.meta)}";
import "${targetFolder}/styles/${custom ? "index" : "bundle"}.scss";

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
