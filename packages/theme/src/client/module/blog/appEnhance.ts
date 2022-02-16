import { defineClientAppEnhance } from "@vuepress/client";

import BlogHome from "@theme-hope/module/blog/components/BlogHome";
import BlogPage from "@theme-hope/module/blog/components/BlogPage";

import "./styles/layout.scss";

export default defineClientAppEnhance(({ app }) => {
  // register to inject styles
  app.component("BlogHome", BlogHome);
  app.component("BlogPage", BlogPage);
});
