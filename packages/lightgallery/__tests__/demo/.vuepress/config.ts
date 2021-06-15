import type { UserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

const config: UserConfig<DefaultThemeOptions> = {
  base: process.env.VuePress_BASE || "/",
  bundler: process.env.BUNDLER ?? "@vuepress/webpack",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "Mr.Hope" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.svg",

    navbar: [
      { text: "Home", link: "/" },
      { text: "Test", link: "/test.html" },
    ],

    themePlugins: {
      mediumZoom: false,
    },
  },

  plugins: [["lightgallery", { plugins: ["video"] }]],
};

export default config;
