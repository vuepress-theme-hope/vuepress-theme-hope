import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import ProjectLink from "./components/ProjectLink.js";
import SocialLink from "./components/SocialLink.js";

import "vuepress-theme-hope/presets/shinning-feature-panel.scss";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("SocialLink", SocialLink);
  },
});
