import { ensureEndingSlash } from "@vuepress/shared";
import { getDirname, path } from "@vuepress/utils";

import type { App } from "@vuepress/core";
import type { ThemeStatus } from "../status.js";

const __dirname = getDirname(import.meta.url);
const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, "../../client")
);

export const prepareConfigFile = (
  app: App,
  { enableBlog, enableEncrypt }: ThemeStatus
): Promise<string> => {
  let configImport = "";
  let enhance = "";
  let setup = "";

  if (enableBlog) {
    configImport += `
import BloggerInfo from "@theme-hope/modules/blog/components/BloggerInfo";
import BlogHome from "@theme-hope/modules/blog/components/BlogHome";
import BlogPage from "@theme-hope/modules/blog/components/BlogPage";
import { setupBlog } from "@theme-hope/modules/blog/composables/index.js";
import "${CLIENT_FOLDER}module/blog/styles/layout.scss";
`;

    enhance += `
app.component("BloggerInfo", BloggerInfo);
app.component("BlogHome", BlogHome);
app.component("BlogPage", BlogPage);
`;

    setup += `setupBlog();\n`;
  }

  if (enableEncrypt) {
    configImport += `
import GloablEncrypt from "@theme-hope/modules/encrypt/components/GloablEncrypt";
import LocalEncrypt from "@theme-hope/modules/encrypt/components/LocalEncrypt";
`;
    enhance += `
app.component("GloablEncrypt", GloablEncrypt);
app.component("LocalEncrypt", LocalEncrypt);
`;
  }

  return app.writeTemp(
    `theme-hope/config.js`,
    `import { defineClientConfig } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import Navbar from "@theme-hope/modules/navbar/components/Navbar";
import Sidebar from "@theme-hope/modules/sidebar/components/Sidebar";

import { useScrollPromise } from "@theme-hope/composables/index.js";
import { injectDarkMode, setupDarkMode } from "@theme-hope/modules/outlook/composables/index.js";
import { setupSidebarItems } from "@theme-hope/modules/sidebar/composables/index.js";

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
    injectDarkMode(app);

    // register to inject styles
    app.component("CommonWrapper", CommonWrapper);
    app.component("HomePage", HomePage);
    app.component("NormalPage", NormalPage);
    app.component("Navbar", Navbar);
    app.component("Sidebar", Sidebar);

${enhance
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
${setup
  .split("\n")
  .map((item) => `    ${item}`)
  .join("\n")}
  },
});`
  );
};
