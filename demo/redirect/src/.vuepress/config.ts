import { defineUserConfig } from "@vuepress/cli";
import { defaultTheme } from "@vuepress/theme-default";
import { redirectPlugin } from "vuepress-plugin-redirect";

const base = <"/" | `/${string}/`>process.env.BASE || "/";

export default defineUserConfig({
  base,

  title: "Redirect",

  description: "VuePress2 Redirect Plugin",

  theme: defaultTheme({
    logo: "/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/redirect/",
  }),

  plugins: [
    redirectPlugin({
      config: {
        "/homepage.html": "/",
      },
    }),
  ],
});
