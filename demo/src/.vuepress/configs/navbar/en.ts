import type { NavbarConfig } from "vuepress-theme-hope";

export const en: NavbarConfig = [
  { text: "Blog Home", link: "/README.md", icon: "home" },
  { text: "Project Home", link: "/home.md", icon: "home" },
  {
    text: "Guide",
    icon: "creative",
    link: "/guide/README.md",
  },
  {
    text: "Reference",
    children: [
      {
        text: "VuePress",
        children: [
          {
            text: "CLI",
            link: "/reference/cli.html",
          },
          "/reference/config.md",
          "/reference/frontmatter.md",
          "/reference/components.md",
          "/reference/plugin-api.md",
          "/reference/theme-api.md",
          "/reference/client-api.md",
          "/reference/node-api.md",
        ],
      },
      {
        text: "Bundlers",
        children: [
          "/reference/bundler/vite.md",
          "/reference/bundler/webpack.md",
        ],
      },
      {
        text: "Default Theme",
        children: [
          "/reference/default-theme/config.md",
          "/reference/default-theme/frontmatter.md",
          "/reference/default-theme/components.md",
          "/reference/default-theme/markdown.md",
          "/reference/default-theme/styles.md",
          "/reference/default-theme/extending.md",
        ],
      },
    ],
  },
  {
    icon: "note",
    text: "v2.x",
    children: [
      {
        text: "v1.x",
        link: "https://vuepress-theme-hope.github.io",
      },
    ],
  },
];
