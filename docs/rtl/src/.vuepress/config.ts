import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "rtl" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "RLT Support",
        description: "A plugin to support RTL layout for VuePress2",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "RTL 支持",
        description: "一个支持 RTL 布局的插件",
      },
    },

    theme,
  },
);
