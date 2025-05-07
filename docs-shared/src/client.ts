import { h } from "vue";
import { defineClientConfig } from "vuepress/client";
import { Layout, NotFound } from "vuepress-theme-hope/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";

import HopeLogo from "./components/HopeLogo.js";
import HopeNotFoundHint from "./components/HopeNotFoundHint.js";
import ProjectLink from "./components/ProjectLink.js";
import SocialLink from "./components/SocialLink.js";

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
  },
});
