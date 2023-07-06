import { config } from "docs-shared";
import theme from "./theme.js";

// the config wrapper is located in <root>/docs-shared/src/config-wrapper.ts
export default config(
  { name: "redirect" },
  {
    locales: {
      "/": {
        lang: "en-US",
        title: "Redirect Plugin",
        description: "Handling redirects for your VuePress site",
      },
      "/zh/": {
        lang: "zh-CN",
        title: "重定向插件",
        description: "为你的 VuePress 站点处理重定向",
      },
    },

    theme,
  },
);
