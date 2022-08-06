import { config } from "docs-shared";
import theme from "./theme";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default config({
  base: `${base}seo/`,

  locales: {
    "/": {
      lang: "en-US",
      title: "SEO Enhance",
      description: "Using <meta> tags to Enhance Your site SEO",
    },

    "/zh/": {
      lang: "zh-CN",
      title: "SEO 增强",
      description: "使用 <meta> tag 为你的站点提供 SEO 增强",
    },
  },

  theme,
});
