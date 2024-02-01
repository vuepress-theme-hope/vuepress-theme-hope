import ProjectLink from "docs-shared/components/ProjectLink.js";
import SocialLink from "docs-shared/components/SocialLink.js";
import { defineClientConfig } from "vuepress/client";

import CustomBlogHome from "./layouts/CustomBlogHome.vue";
import SlotDemo from "./layouts/SlotDemo.vue";

import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("SocialLink", SocialLink);
  },
  layouts: { CustomBlogHome, SlotDemo },
});
