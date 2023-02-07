import { defineClientConfig } from "@vuepress/client";

import ProjectLink from "./components/ProjectLink.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
  },
});
