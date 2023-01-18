import { addViteSsrNoExternal, config, getDirname, path } from "docs-shared";
import theme from "./theme.js";

const __dirname = getDirname(import.meta.url);

export default config(
  {
    name: "components",
  },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Components Lib",
        description: "Useful components for VuePress2",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "组件库",
        description: "面向 VuePress2 的常用组件",
      },
    },

    extendsBundlerOptions: (bundlerOptions, app) => {
      addViteSsrNoExternal(bundlerOptions, app, "artplayer-plugin-danmuku");
    },

    alias: {
      "@IconDisplay": path.resolve(__dirname, "./components/IconDisplay"),
    },

    theme,
  }
);
