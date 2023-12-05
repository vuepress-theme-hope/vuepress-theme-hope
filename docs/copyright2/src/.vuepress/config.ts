import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "copyright2" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Copyright Info",
        description: "Append copyright info during copy",
      },

      "/zh/": {
        lang: "zh-CN",
        title: "版权信息",
        description: "在复制时添加版权信息",
      },
    },

    theme,
  },
);
