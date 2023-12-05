import { defineClientConfig } from "@vuepress/client";
import { defineEchartsConfig } from "vuepress-plugin-md-enhance/client";

import ProjectLink from "docs-shared/components/ProjectLink.js";
import TelegramLink from "docs-shared/components/TelegramLink.js";

defineEchartsConfig({
  setup: async () => {
    await import("echarts-wordcloud");
  },
});

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("TelegramLink", TelegramLink);
  },
});
