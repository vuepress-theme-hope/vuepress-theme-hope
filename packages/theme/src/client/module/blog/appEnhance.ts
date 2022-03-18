import { defineClientAppEnhance } from "@vuepress/client";

import BloggerInfo from "@theme-hope/module/blog/components/BloggerInfo";
import BlogHome from "@theme-hope/module/blog/components/BlogHome";
import BlogPage from "@theme-hope/module/blog/components/BlogPage";

import "./styles/layout.scss";

export default defineClientAppEnhance(({ app }) => {
  // register to inject styles
  app.component("BloggerInfo", BloggerInfo);
  app.component("BlogHome", BlogHome);
  app.component("BlogPage", BlogPage);
});
