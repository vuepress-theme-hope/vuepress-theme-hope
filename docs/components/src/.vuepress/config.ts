import { addViteSsrNoExternal, config } from "docs-shared";

import theme from "./theme.js";

// The config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config("components", {
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

  theme,
});
