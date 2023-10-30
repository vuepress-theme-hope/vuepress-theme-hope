import { defineClientConfig } from "@vuepress/client";
import { defineEchartsConfig } from "vuepress-plugin-md-enhance/client";
import SlidePage from "vuepress-plugin-md-enhance/SlidePage";

defineEchartsConfig({
  setup: async () => {
    import("echarts-wordcloud");
  },
});

export default defineClientConfig({
  layouts: {
    Slide: SlidePage,
  },
});
