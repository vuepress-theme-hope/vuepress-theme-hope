import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import CommentService from "./components/CommentService.js";
import { injectCommentConfig } from "./helpers/index.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  enhance: ({ app }) => {
    injectCommentConfig(app);
    app.component("CommentService", CommentService);
  },
});
