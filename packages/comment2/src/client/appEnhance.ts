import { defineClientAppEnhance } from "@vuepress/client";
import CommentService from "./components/CommentService";

import "./styles/index.scss";

export default defineClientAppEnhance(({ app }) => {
  app.component("CommentService", CommentService);
});
