import { addViteOptimizeDepsInclude } from "@mr-hope/vuepress-shared";
import { defineUserConfig } from "@vuepress/cli";
import type { DefaultThemeOptions } from "@vuepress/theme-default";

export default defineUserConfig<DefaultThemeOptions>({
  base: (process.env.VuePress_BASE as `/${string}/`) || "/",

  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "Mr.Hope" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
      },
    ],
  ],

  locales: {
    "/": {
      lang: "en-US",
      title: "Markdown Enhance Plugin",

      description: "Markdown Enhancement for VuePress",
    },
  },

  themeConfig: {
    logo: "/logo.svg",

    locales: {
      "/": {
        lang: "en-US",
        selectText: "Language",
        ariaLabel: "Select language",
        label: "English",
        editLinkText: "Edit on GitHub",

        navbar: [
          { text: "Home", link: "/" },
          { text: "Guide", link: "/guide/" },
          { text: "Config", link: "/api/" },
        ],

        sidebar: {
          "/guide/": [
            "/guide/README.md",
            "/guide/code-group.md",
            "/guide/container.md",
            "/guide/sup-sub.md",
            "/guide/align.md",
            "/guide/footnote.md",
            "/guide/mermaid.md",
            "/guide/mark.md",
            "/guide/tex.md",
            "/guide/demo/README.md",
            "/guide/demo/normal.md",
            "/guide/demo/vue.md",
            "/guide/demo/react.md",
            "/guide/presentation/README.md",
            "/guide/presentation/demo.md",
            "/guide/presentation/themes.md",
          ],

          "/": ["/README.md", "/guide/README.md"],
        },
      },
    },

    repo: "https://github.com/mister-hope/vuepress-plugin-md-enhance",
    docsDir: "docs",
    repoLabel: "GitHub",
    editLinks: true,
    editLinkText: "在 GitHub 上编辑此页",

    themePlugins: {
      container: {
        tip: false,
        warning: false,
        danger: false,
        details: false,
      },
    },
  },

  plugins: [
    [
      "md-enhance",
      {
        enableAll: true,
        presentation: {
          plugins: [
            "highlight",
            "math",
            "search",
            "notes",
            "zoom",
            "anything",
            "audio",
            "chalkboard",
          ],
        },
      },
    ],
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
