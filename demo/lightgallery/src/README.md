---
home: true
title: Home
heroImage: https://theme-hope-assets.vuejs.press/logo.svg
heroText: vuepress-plugin-lightgallery
tagline: Image Preview Plugin for VuePress2
actions:
  - text: Docs
    link: https://plugin-lightgallery.vuejs.press

footer: MIT Licensed, Copyright © 2019-present Mr.Hope
---

This is a paragraph.

![logo](https://theme-hope-assets.vuejs.press/logo.svg)

This is a paragraph.

<!-- markdownlint-disable -->

<div class="image-preview">
  <img src="//theme-hope-assets.vuejs.press/files/img/1.jpg" />
  <img src="//theme-hope-assets.vuejs.press/files/img/2.jpg" />
  <img src="//theme-hope-assets.vuejs.press/files/img/3.jpg" />
</div>

<style>
  .image-preview {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

  .image-preview > img {
     box-sizing: border-box;
     width: 33.3% !important;
     padding: 9px;
     border-radius: 16px;
  }

  @media (max-width: 719px){
    .image-preview > img {
      width: 50% !important;
    }
  }

  @media (max-width: 419px){
    .image-preview > img {
      width: 100% !important;
    }
  }
</style>

<!-- markdownlint-restore -->
