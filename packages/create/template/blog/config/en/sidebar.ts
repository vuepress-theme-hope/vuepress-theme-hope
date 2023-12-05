import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Articles",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
