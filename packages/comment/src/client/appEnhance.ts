import { defineClientAppEnhance } from "@vuepress/client";
import Comment from "./components/Comment";
import PageInfo from "./components/PageInfo";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  app.component("Comment", Comment);
  app.component("PageInfo", PageInfo);
});
