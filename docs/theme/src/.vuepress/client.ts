import HopeLogo from "docs-shared/components/HopeLogo.js";
import HopeNotFoundHint from "docs-shared/components/HopeNotFoundHint.js";
import ProjectLink from "docs-shared/components/ProjectLink.js";
import SocialLink from "docs-shared/components/SocialLink.js";
import { h } from "vue";
import { defineClientConfig } from "vuepress/client";
import { defineEChartsConfig } from "vuepress-plugin-md-enhance/client";
import { Layout, NotFound } from "vuepress-theme-hope/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";

import BlogSlotDemo from "./layouts/BlogSlotDemo.vue";
import CustomBlogHome from "./layouts/CustomBlogHome.vue";
import LayoutSlotDemo from "./layouts/LayoutSlotDemo.vue";

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
    setupTransparentNavbar({ type: "homepage" });
  },

  layouts: {
    Layout: () => h(Layout, {}, { heroLogo: () => h(HopeLogo) }),
    NotFound: () => h(NotFound, {}, () => h(HopeNotFoundHint)),
    CustomBlogHome,
    BlogSlotDemo,
    LayoutSlotDemo,
  },
});
