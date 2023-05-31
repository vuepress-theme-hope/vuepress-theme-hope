import { defineClientConfig } from "@vuepress/client";

import ProjectLink from "./components/ProjectLink.js";

import "vuepress-theme-hope/presets/bounce-icon.scss";
import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
  },
});
