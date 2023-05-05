import { defineClientConfig } from "@vuepress/client";
import ProjectLink from "docs-shared/components/ProjectLink.js";

import CustomBlogHome from "./layouts/CustomBlogHome.vue";
import SlotDemo from "./layouts/SlotDemo.vue";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
  },
  layouts: { CustomBlogHome, SlotDemo },
});
