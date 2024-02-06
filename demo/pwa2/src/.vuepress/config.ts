import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress/cli";
import { pwaPlugin } from "vuepress-plugin-pwa2";

export default defineUserConfig({
  base: "/",

  title: "PWA Plugin",
  description: "PWA Plugin for VuePress2",

  theme: defaultTheme({
    logo: "https://theme-hope-assets.vuejs.press/logo.svg",

    repo: "vuepress-theme-hope/vuepress-theme-hope/tree/main/demo/pwa2/",
  }),

  plugins: [
    pwaPlugin({
      manifest: {
        name: "vuepress-plugin-pwa2",
        // eslint-disable-next-line @typescript-eslint/naming-convention
        short_name: "pwa2 demo",
        description: "PWA plugin demo for VuePress",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/img/icon/chrome192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/icon/chrome512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],

  shouldPrefetch: false,
});
