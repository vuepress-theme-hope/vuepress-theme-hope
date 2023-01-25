import { CLIENT_FOLDER } from "../utils.js";

import type { App } from "@vuepress/core";
import type { ThemeStatus } from "../config/status.js";

export const prepareConfigFile = (
  app: App,
  { enableBlog, enableEncrypt, enableSlide }: ThemeStatus
): Promise<string> => {
  let configImport = "";
  let enhance = "";
  let setup = "";
  let layout = "";

  if (enableBlog) {
    configImport += `\
import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo";
import { setupBlog } from "@theme-hope/modules/blog/composables/index";
import BlogCategory from "${CLIENT_FOLDER}modules/blog/layouts/BlogCategory.js";
import BlogHome from "${CLIENT_FOLDER}modules/blog/layouts/BlogHome.js";
import BlogType from "${CLIENT_FOLDER}modules/blog/layouts/BlogType.js";
import Timeline from "${CLIENT_FOLDER}modules/blog/layouts/Timeline.js";
import "${CLIENT_FOLDER}modules/blog/styles/layout.scss";
`;

    enhance += `\
app.component("BloggerInfo", BloggerInfo);
`;

    setup += `\
setupBlog();
`;

    layout += `\
BlogCategory,
BlogHome,
BlogType,
Timeline,
`;
  }

  if (enableEncrypt) {
    configImport += `\
import GlobalEncrypt from "@theme-hope/modules/encrypt/components/GlobalEncrypt";
import LocalEncrypt from "@theme-hope/modules/encrypt/components/LocalEncrypt";
`;
    enhance += `\
app.component("GlobalEncrypt", GlobalEncrypt);
app.component("LocalEncrypt", LocalEncrypt);
`;
  }

  if (enableSlide) {
    configImport += `import Slide from "${CLIENT_FOLDER}layouts/Slide.js";\n`;
    layout += "Slide,\n";
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `import { defineClientConfig } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import Navbar from "@theme-hope/modules/navbar/components/Navbar";
import Sidebar from "@theme-hope/modules/sidebar/components/Sidebar";
import Layout from "${CLIENT_FOLDER}layouts/Layout.js";
import NotFound from "${CLIENT_FOLDER}layouts/NotFound.js";

import { useScrollPromise } from "@theme-hope/composables/index";
import { injectDarkmode, setupDarkmode } from "@theme-hope/modules/outlook/composables/index";
import { setupSidebarItems } from "@theme-hope/modules/sidebar/composables/index";

import "${CLIENT_FOLDER}styles/index.scss";

${configImport}

export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // inject global properties
    injectDarkmode(app);

${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
    setupDarkmode();
    setupSidebarItems();
${setup
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  layouts: {
    Layout,
    NotFound,
${layout
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  }
});`
  );
};
