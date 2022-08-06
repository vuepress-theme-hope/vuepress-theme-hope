import { config } from "docs-shared";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default config({
  base: `${base}reading-time/`,

  dest: "./dist",

  locales: {
    "/": {
      lang: "en-US",
      title: "Reading Time Counter",
      description: "Expect reading time and word count statistics",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "阅读时间生成",
      description: "预计阅读时间与字数统计生成",
    },
  },

  theme,
});
