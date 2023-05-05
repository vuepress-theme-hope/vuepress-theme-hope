import { defineClientConfig } from "@vuepress/client";

import CommentService from "./components/CommentService.js";
import { injectCommentConfig } from "./helpers/index.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    injectCommentConfig(app);
    app.component("CommentService", CommentService);
  },
});
