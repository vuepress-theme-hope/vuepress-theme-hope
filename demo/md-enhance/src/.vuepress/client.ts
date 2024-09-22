import { defineClientConfig } from "vuepress/client";
import { defineEChartsConfig } from "vuepress-plugin-md-enhance/client";

import Snippet from "./layouts/Snippet.js";

defineEChartsConfig({
  setup: async () => {
    await import("echarts-wordcloud");
  },
});

export default defineClientConfig({
  layouts: {
    Snippet,
  },
});
