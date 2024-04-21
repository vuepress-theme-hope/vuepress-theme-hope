import { defineClientConfig } from "vuepress/client";
import SlidePage from "vuepress-plugin-md-enhance/SlidePage";
import { defineEChartsConfig } from "vuepress-plugin-md-enhance/client";

import Snippet from "./layouts/Snippet.js";

defineEChartsConfig({
  setup: async () => {
    await import("echarts-wordcloud");
  },
});

export default defineClientConfig({
  layouts: {
    Slide: SlidePage,
    Snippet,
  },
});
