import { defineClientConfig } from "@vuepress/client";
import { defineGiscusConfig } from "vuepress-plugin-comment2/client";

import Layout from "./layouts/Layout.vue";

defineGiscusConfig({
  repo: "vuepress-theme-hope/giscus-discussions",
  repoId: "R_kgDOG_Pt2A",
  category: "Announcements",
  categoryId: "DIC_kwDOG_Pt2M4COD69",
});

export default defineClientConfig({
  layouts: {
    // we override the default layout to provide comment service
    Layout,
  },
});
