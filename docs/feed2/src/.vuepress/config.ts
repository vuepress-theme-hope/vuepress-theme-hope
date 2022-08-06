import { config } from "docs-shared";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default config({
  base: `${base}feed/`,

  locales: {
    "/": {
      lang: "en-US",
      title: "Feed Generator",
      description: "Feed Plugin for VuePress2",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "Feed 生成器",
      description: "VuePress Feed 插件",
    },
  },

  theme,
});
