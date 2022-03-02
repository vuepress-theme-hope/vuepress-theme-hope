import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { defineUserConfig } from "@vuepress/cli";
import { path } from "@vuepress/utils";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: "/",
  title: "Comment Plugin",

  description: "Comment Plugin for VuePress",

  locales: {
    "/": { lang: "en-US" },
  },

  theme: path.resolve(__dirname, "./theme"),

  themeConfig: {
    logo: "/logo.svg",

    navbar: [
      { text: "Home", link: "/" },
      {
        text: "Test",
        children: [{ text: "Test", link: "/test/" }],
      },
    ],
  },

  plugins: [
    {
      name: "enhance",
      onInitialized: (app) => {
        if (app.env.isDev)
          addViteOptimizeDepsInclude(app, [
            "@mr-hope/vuepress-shared/lib/client",
            "dayjs",
            "dayjs/plugin/localizedFormat",
            "dayjs/plugin/objectSupport",
            "dayjs/plugin/timezone",
            "dayjs/plugin/utc",
          ]);
      },
    },
  ],
});
