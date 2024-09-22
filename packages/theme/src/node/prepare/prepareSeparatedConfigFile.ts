import { getRealPath } from "@vuepress/helper";
import type { App } from "vuepress/core";

import { PageInfo } from "../../shared/index.js";
import type { ThemeStatus } from "../config/index.js";
import { CLIENT_FOLDER } from "../utils.js";

const { url } = import.meta;

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
      `import { defineCatalogInfoGetter } from "${getRealPath(
        "@vuepress/plugin-catalog/client",
        url,
      )}"`,
      `import { h } from "vue"`,
    );
    actions.push(`\
defineCatalogInfoGetter((meta) => {
  const title = meta.${PageInfo.title};
  const shouldIndex = meta.${PageInfo.index} !== false;
  const icon = meta.${PageInfo.icon};

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.${PageInfo.order},
    index: meta.${PageInfo.index},
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
import { HopeIcon, Layout, NotFound, injectDarkmode, setupDarkmode, setupSidebarItems, scrollPromise } from "${CLIENT_FOLDER}export.js";

${imports.join("\n")}

import "${getRealPath("@vuepress/helper/colors.css", url)}";
import "${getRealPath("@vuepress/helper/normalize.css", url)}";
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
    injectDarkmode(app);

    // provide HopeIcon as global component
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
${layouts.map((item) => `    ${item},`).join("\n")}
  }
};
`,
  );
};
