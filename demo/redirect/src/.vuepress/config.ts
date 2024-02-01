import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { redirectPlugin } from "vuepress-plugin-redirect";

const base = <"/" | `/${string}/`>process.env["BASE"] || "/";

export default defineUserConfig({
  base,

  title: "Redirect",

  description: "VuePress2 Redirect Plugin",

  locales: {
    "/en/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/redirect/",
  }),

  plugins: [
    redirectPlugin({
      autoLocale: true,
      switchLocale: "modal",
      config: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "/homepage.html": "/",
      },
    }),
  ],
});
