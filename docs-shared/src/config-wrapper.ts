import { addViteOptimizeDepsInclude } from "@vuepress/helper";
import type { UserConfig } from "vuepress";
import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils";

import { pwaHead } from "./head.js";

const __dirname = getDirname(import.meta.url);

const IS_GITEE = "GITEE" in process.env;
const IS_NETLIFY = "NETLIFY" in process.env;
const IS_GITHUB = !IS_GITEE && !IS_NETLIFY;

export const config = (name: string, config: UserConfig): UserConfig => {
  const base = name.replace(/\d+$/, "");
  const docsBase = IS_NETLIFY
    ? "/"
    : base
      ? (`/v2/${base}/` as `/${string}/`)
      : "/v2/";

  return defineUserConfig({
    base: docsBase,

    dest: "./dist",

    head: pwaHead,

    define: () => ({ IS_GITEE, IS_GITHUB, IS_NETLIFY }),

    extendsBundlerOptions: (bundlerOptions: unknown, app): void => {
      addViteOptimizeDepsInclude(bundlerOptions, app, [
        "three",
        "three/examples/jsm/controls/OrbitControls",
        "three/examples/jsm/loaders/STLLoader",
      ]);
    },

    onInitialized: (app) => {
      if (IS_NETLIFY) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        app.pages.find((page) => page.path === "/")!.frontmatter.footer = `\
<a href="https://www.netlify.com" target="_blank">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="Deploys by Netlify" data-mode="lightmode-only">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="Deploys by Netlify" data-mode="darkmode-only">
</a>
<br/>
Theme by <a href="https://theme-hope.vuejs.press" target="_blank">VuePress Theme Hope</a> | MIT Licensed, Copyright © 2019-present Mr.Hope
`;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        app.pages.find((page) => page.path === "/zh/")!.frontmatter.footer = `\
<a href="https://www.netlify.com" target="_blank">
  <img src="https://www.netlify.com/img/global/badges/netlify-light.svg" alt="由 Netlify 部署" data-mode="lightmode-only">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="由 Netlify 部署" data-mode="darkmode-only">
</a>
<br/>
使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a> 主题 | MIT 协议, 版权所有 © 2019-至今 Mr.Hope
`;
      }
    },

    shouldPrefetch: false,
    shouldPreload: false,

    clientConfigFile: path.resolve(__dirname, "./client.js"),

    ...config,
  });
};
