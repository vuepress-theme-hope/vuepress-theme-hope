---
home: true
icon: home
title: Home
heroImage: /logo.svg
bgImage: https://theme-hope-assets.vuejs.press/bg/6-light.svg
bgImageDark: https://theme-hope-assets.vuejs.press/bg/6-dark.svg
bgImageStyle:
  background-attachment: fixed
heroText: VuePress Theme Hope
tagline: A VuePress theme with tons of features✨
actions:
  - text: Tutorial 🧭
    link: /cookbook/tutorial/
    type: primary

  - text: Intro 💡
    link: /guide/get-started/intro.html

  - text: Config 🛠
    link: /config/

  - text: Online Demo 🪀
    link: https://stackblitz.com/fork/vuepress-theme-hope

highlights:
  - header: Easy to install
    image: /assets/image/box.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/3-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/3-dark.svg
    highlights:
      - title: Run <code>pnpm create vuepress-theme-hope hope-project</code> to create a new project with this theme.
      - title: Run <code>pnpm create vuepress-theme-hope add .</code> in your project root to create a new project with this theme.

  - header: Add things you want in markdown
    description: We extended the standard commonMark specification and added tons of new features for you.
    image: /assets/image/markdown.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/2-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/2-dark.svg
    bgImageStyle:
      background-repeat: repeat
      background-size: initial
    highlights:
      - title: Marking contents
        icon: highlighter
        details: Custom container, attrs, mark and stylize support

      - title: Writing articles
        icon: feather
        details: Custom alignment, footnote, snippets include and new image syntax support

      - title: Richer Your Contents
        icon: star
        details: Tex, presentation, tabs, superscript, subscript, tasklist and card support

      - title: Inserting Charts
        icon: chart-simple
        details: Chart.js, ECharts, flowchart and Mermaid support

      - title: Showing your codes and works
        icon: lightbulb
        details: Code tabs, code demo, playground and vue playground

  - header: Improved layouts
    description: An awesome responsive layout with full a11y support.
    image: /assets/image/layout.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Layout
        icon: object-group
        details: Improved navbar, sidebar, page nav and new breadcrumb, footer and toc. We also bring you a brand new homepage.
        link: /guide/layout/

      - title: Dark Mode
        icon: circle-half-stroke
        details: Switch between light and dark modes freely
        link: /guide/interface/darkmode.html

      - title: Customizable Theme Color
        icon: palette
        details: Customize theme color
        link: /guide/interface/theme-color.html

      - title: Slide Page
        icon: person-chalkboard
        details: Adding slide pages to display things you like
        link: /guide/layout/slides

      - title: More
        icon: ellipsis
        details: RTL layout, print support, fullscreen button, etc.
        link: /guide/interface/others.html

  - header: New features
    image: /assets/image/features.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/1-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/1-dark.svg
    highlights:
      - title: Pageviews and Comments
        icon: comment-dots
        details: Start pageview statistics and comment support with Waline
        link: /guide/feature/comment.html

      - title: Article Information
        icon: circle-info
        details: Add author, writing date, reading time, word count and other information to your article
        link: /guide/feature/page-info.html

      - title: Article Encryption
        icon: lock
        details: Encrypt you articles based on page links, so that only the one you want could see them
        link: /guide/feature/encrypt.html

      - title: Search
        icon: search
        details: Support docsearch and client search
        link: /guide/feature/search.html

      - title: Copy Code Blocks
        icon: copy
        details: Copy codes with one click in code blocks
        link: /guide/feature/copy-code.html

      - title: Image Preview
        icon: image
        details: Support viewing, zooming, sharing your page images like a gallery
        link: /guide/feature/photo-swipe.html

  - header: Blogging
    description: Create personal blog with theme
    image: /assets/image/blog.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/5-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/5-dark.svg
    highlights:
      - title: Blog features
        icon: blog
        details: Listing your articles with their dates, tags and categories
        link: /guide/blog/intro.html

      - title: Blog homepage
        icon: blog
        details: New blog homepage
        link: /guide/blog/home.html

      - title: Blogger info
        icon: circle-info
        details: Customize avatar, name, slogan, introduction and social links
        link: /guide/blog/blogger.html

      - title: Timeline
        icon: clock
        details: Read through blog posts in a timeline
        link: /guide/blog/timeline.html

  - header: Advanced
    description: Advanced features to improve site SEO and user experience
    image: /assets/image/advanced.svg
    bgImage: https://theme-hope-assets.vuejs.press/bg/4-light.svg
    bgImageDark: https://theme-hope-assets.vuejs.press/bg/4-dark.svg
    highlights:
      - title: SEO Enhancement
        icon: dumbbell
        details: Optimize pages for search engines
        link: /guide/advanced/seo.html

      - title: Sitemap
        icon: sitemap
        details: Generate a Sitemap for your site
        link: /guide/advanced/sitemap.html

      - title: Feed
        icon: rss
        details: Generate feed to allow users to subscribe it
        link: /guide/advanced/feed.html

      - title: PWA
        icon: mobile-screen
        details: Make your site more like an APP
        link: /guide/advanced/pwa.html

copyright: false
footer: MIT Licensed | Copyright © 2019-present Mr.Hope
---

<NetlifyBadge />

<script setup lang="ts">
import NetlifyBadge from "@NetlifyBadge";
</script>
