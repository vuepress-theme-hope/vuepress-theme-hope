---
title: Related Plugins
icon: puzzle-piece
---

<!-- markdownlint-disable -->

<div class="plugins-wrapper">
  <a v-for="{ text, icon, link } in features" class="plugin-item" target="_blank" :href="link">
    <HopeIcon :icon="icon" />
    <div>{{text}}</div>
  </a>
</div>

<script setup lang="ts">
const getLink = (name: string): string =>
  `https://${
    IS_NETLIFY
      ? `${name === "shared" ? name : `plugin-${name}`}.vuejs.press/`
      : `vuepress-theme-hope.${
          IS_GITEE ? "gitee" : "github"
        }.io/v2/${name.replace(/\d+$/, "")}/`
  }`;

const features = [
  {
    text: "Auto catalog Plugin",
    icon: "network-wired",
    link: getLink("auto-catalog"),
  },
  {
    text: "Blog Plugin",
    icon: "blog",
    link: getLink("blog2"),
  },
  {
    text: "Comment Plugin",
    icon: "comment",
    link: getLink("comment2"),
  },
  {
    text: "Components Plugin",
    icon: "puzzle-piece",
    link: getLink("components"),
  },
  {
    text: "Copy Code Plugin",
    icon: "copy",
    link: getLink("copy-code2"),
  },
  {
    text: "Copyright Plugin",
    icon: "copyright",
    link: getLink("copyright2"),
  },
  {
    text: "Feed Plugin",
    icon: "rss",
    link: getLink("feed2"),
  },
  {
    text: "LightGallery Plugin",
    icon: "image",
    link: getLink("lightgallery"),
  },
  {
    text: "Markdown Enhance Plugin",
    icon: "fab fa-markdown",
    link: getLink("md-enhance"),
  },
  {
    text: "Photo Swipe Plugin",
    icon: "image",
    link: getLink("photo-swipe"),
  },
  {
    text: "PWA Plugin",
    icon: "mobile",
    link: getLink("pwa2"),
  },
  {
    text: "Reading Time Plugin",
    icon: "book-open",
    link: getLink("reading-time2"),
  },
  {
    text: "Remove PWA Plugin",
    icon: "trash-can",
    link: getLink("remove-pwa"),
  },
  {
    text: "Redirect Plugin",
    icon: "fas fa-eject fa-rotate-90",
    link: getLink("redirect"),
  },
  {
    text: "Sass Palette Plugin",
    icon: "palette",
    link: getLink("sass-palette"),
  },
  {
    text: "Client Search Plugin",
    icon: "search",
    link: getLink("search-pro"),
  },
  {
    text: "Seo Plugin",
    icon: "wrench",
    link: getLink("seo2"),
  },
  {
    text: "VuePress shared",
    icon: "toolbox",
    link: getLink("shared"),
  },
  {
    text: "Sitemap Plugin",
    icon: "sitemap",
    link: getLink("sitemap2"),
  },
];
</script>
