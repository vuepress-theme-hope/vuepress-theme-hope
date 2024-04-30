import ProjectLink from "docs-shared/components/ProjectLink.js";
import SocialLink from "docs-shared/components/SocialLink.js";
import { defineClientConfig } from "vuepress/client";
import { defineEChartsConfig } from "vuepress-plugin-md-enhance/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";

defineEChartsConfig({
  setup: async () => {
    await import("echarts-wordcloud");
  },
});

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("SocialLink", SocialLink);
  },
  setup: () => {
    setupTransparentNavbar({ type: "homepage", light: "#333", dark: "#bbb" });
  },
});
