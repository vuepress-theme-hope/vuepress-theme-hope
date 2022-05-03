import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { redirectPlugin } from "vuepress-plugin-redirect2";

const BASE = process.env.BASE as "/" | `/${string}/`;

export default defineUserConfig({
  base: BASE || "/",

  title: "Redirect",

  description: "VuePress2 Redirect Plugin",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/redirect2/",
  }),

  plugins: [
    redirectPlugin({
      config: {
        "/homepage.html": "/",
      },
    }),
  ],
});
