import { navbar } from "vuepress-theme-hope";
import { version } from "../version.js";

export const enNavbar = navbar([
  "/",
  "/demo/",
  {
    text: "Guide",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "#" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "#" }],
      },
    ],
  },
  {
    text: version,
    icon: "book",
    children: [
      {
        text: "V2 Docs",
        link: "https://theme-hope.vuejs.press/",
      },
      {
        text: "V2 Blog Demo",
        link: "https://theme-hope-blog-demo.vuejs.press/",
      },
    ],
  },
]);
