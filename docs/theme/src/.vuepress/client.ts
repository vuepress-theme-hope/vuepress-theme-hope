import { defineClientConfig } from "@vuepress/client";
import ProjectLink from "docs-shared/components/ProjectLink.js";
import TelegramLink from "docs-shared/components/TelegramLink.js";

import CustomBlogHome from "./layouts/CustomBlogHome.vue";
import SlotDemo from "./layouts/SlotDemo.vue";

import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("TelegramLink", TelegramLink);
  },
  layouts: { CustomBlogHome, SlotDemo },
});
