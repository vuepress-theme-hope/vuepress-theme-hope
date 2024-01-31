import { getRealPath } from "@vuepress/helper/node";
import type { App } from "vuepress/core";

import { ArticleInfoType } from "../../../shared/index.js";
import type { ThemeStatus } from "../../config/index.js";
import { CLIENT_FOLDER } from "../../utils.js";

const { url } = import.meta;

/**
 * @private
 */
export const prepareSeparatedConfigFile = (
  app: App,
  { enableAutoCatalog, enableBlog, enableEncrypt, enableSlide }: ThemeStatus,
): Promise<string> => {
  const imports: string[] = [];
  const enhances: string[] = [];
  const setups: string[] = [];
  const actions: string[] = [];
  const layouts = [];

  if (enableAutoCatalog) {
    imports.push(
      `import { defineAutoCatalogGetter } from "${getRealPath(
        "vuepress-plugin-auto-catalog/client",
        url,
      )}"`,
      `import { h } from "vue"`,
    );
    actions.push(`\
defineAutoCatalogGetter((meta) => {
  const title = meta.${ArticleInfoType.title};
  const shouldIndex = meta.${ArticleInfoType.index} !== false;
  const icon = meta.${ArticleInfoType.icon};

  return shouldIndex ? {
    title,
    content: icon ? () =>[h(HopeIcon, { icon }), title] : null,
    order: meta.${ArticleInfoType.order},
    index: meta.${ArticleInfoType.index},
  } : null;
});`);
  }

  if (enableBlog) {
    imports.push(
      `import { BlogCategory, BlogHome, BlogType, BloggerInfo, Timeline, setupBlog } from "${CLIENT_FOLDER}modules/blog/export.js";`,
      `import "${CLIENT_FOLDER}modules/blog/styles/layout.scss";`,
    );

    enhances.push(`app.component("BloggerInfo", BloggerInfo);`);

    setups.push("setupBlog();");

    layouts.push("BlogCategory,", "BlogHome,", "BlogType,", "Timeline,");
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

  if (enableSlide) {
    imports.push(
      `import Slide from "${getRealPath(
        "vuepress-plugin-md-enhance/SlidePage",
        url,
      )}";`,
    );
    layouts.push("Slide,");
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `\
import { defineClientConfig } from "vuepress/client";
import { VPLink } from "${getRealPath("vuepress-shared/client", url)}";

import { HopeIcon, Layout, NotFound, useScrollPromise, injectDarkmode, setupDarkmode, setupSidebarItems } from "${CLIENT_FOLDER}export.js";

${imports.join("\n")}

import "${CLIENT_FOLDER}styles/index.scss";

${actions.join("\n")}

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

    // provide HopeIcon as global component
    app.component("HopeIcon", HopeIcon);
    // provide VPLink as global component
    app.component("VPLink", VPLink);

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
});`,
  );
};
