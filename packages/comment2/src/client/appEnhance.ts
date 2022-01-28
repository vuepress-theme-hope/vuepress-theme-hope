import { defineClientAppEnhance } from "@vuepress/client";
import CommentService from "./components/CommentService";

export default defineClientAppEnhance(({ app }) => {
  app.component("CommentService", CommentService);
});
