import { config } from "docs-shared";
import theme from "./theme";

const base = (process.env.BASE || "/") as "/" | `/${string}/`;

export default config({
  base: `${base}comment/`,

  locales: {
    "/": {
      lang: "en-US",
      title: "Comment Plugin",
      description: "Comment Plugin for VuePress",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "评论插件",
      description: "VuePress 的评论插件",
    },
  },

  theme,
});
