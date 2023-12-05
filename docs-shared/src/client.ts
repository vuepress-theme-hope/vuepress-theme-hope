import { defineClientConfig } from "@vuepress/client";

import ProjectLink from "./components/ProjectLink.js";
import TelegramLink from "./components/TelegramLink.js";

import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("TelegramLink", TelegramLink);
  },
});
