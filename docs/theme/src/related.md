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
    text: "Append Date Plugin",
    icon: "clock",
    link: getLink("append-date"),
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
    text: "VuePress shared",
    icon: "toolbox",
    link: getLink("shared"),
  },
];
</script>
