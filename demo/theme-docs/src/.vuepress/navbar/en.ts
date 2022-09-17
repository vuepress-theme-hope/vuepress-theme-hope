import { navbar } from "vuepress-theme-hope";
import { version } from "../version";

export const enNavbar = navbar([
  "/",
  { text: "Demo", icon: "discover", link: "/demo/" },
  {
    text: "Guide",
    icon: "creative",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "creative",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "more", link: "" }],
      },
      {
        text: "Foo",
        icon: "config",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "more", link: "" }],
      },
    ],
  },
  {
    text: version,
    icon: "note",
    children: [
      {
        text: "V2 Docs",
        link: "https://vuepress-theme-hope.github.io/v2/",
      },
      {
        text: "V2 Blog Demo",
        link: "https://vuepress-theme-hope.github.io/blog-demo/",
      },
      {
        text: "V1 Docs",
        link: "https://vuepress-theme-hope.github.io/v1/",
      },
      {
        text: "V1 Demo",
        link: "https://vuepress-theme-hope.github.io/v1-demo/",
      },
    ],
  },
]);
