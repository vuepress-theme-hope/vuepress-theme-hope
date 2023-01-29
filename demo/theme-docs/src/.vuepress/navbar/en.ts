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
        link: "https://theme-hope.vuejs.press/",
      },
      {
        text: "V2 Blog Demo",
        link: "https://theme-hope-blog-demo.vuejs.press/",
      },
    ],
  },
]);
