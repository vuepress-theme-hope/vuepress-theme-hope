import ProjectLink from "docs-shared/components/ProjectLink.js";
import SocialLink from "docs-shared/components/SocialLink.js";
import { defineClientConfig } from "vuepress/client";
import { defineEchartsConfig } from "vuepress-plugin-md-enhance/client";

defineEchartsConfig({
  setup: async () => {
    await import("echarts-wordcloud");
  },
});

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("SocialLink", SocialLink);
  },
});
