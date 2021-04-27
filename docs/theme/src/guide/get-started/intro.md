---
title: Theme intro
icon: info
category: Get Started
tags:
  - intro
---

## 🎈 The original intention and design goals of this theme

### Original intention

The original intention of making this theme was to find that VuePress is just a pure static document generator. For example, it will not inject meta tags for SEO optimization, nor will it generate a Sitemap to help search engines index the content of the document.

At the same time, as Evan You switched to VitePress driven by Vite, the community ecosystem of VuePress was getting worse and worse. Some developers took up the most intuitive plugin names, such as `copy-code` `feed` `seo` `sitemap`, etc, while provides weak functions and no longer provides any updates.

At the same time, though VuePress has extended Markdown syntax to a certain extent, it still lacks some commonly used functions, such as text alignment, mark, flowchart, formula, presentation, etc. At the same time, some features provided by the default theme are weak or missing, such as picture preview, dark mode, etc.

In this case, the design of `vuepress-theme-hope` was born. Since the developer, Mr. Hope, is a physics major and is not good at design, this theme maintains the simple style of the default theme with little changes, while dedicates to provide a full range of enhancements for **VuePress**.

### Design goals

- Direction: All the functions of the theme are to enhance the document **content richness** and **shareable**.

- Powerful and independent functions: The theme provides comprehensive details on functions and decompose them into independent plugins so users can use them in other themes.

- Zero or simple configuration: All functions of this theme are designed to work under zero or simple configuration to reduce your migration or learning costs while directly enjoy their convenience.

## ✨ Why is it powerful

### Markdown

The theme provides a lot of extended syntax support for Markdown, allowing you to insert more content in the body.

- If you are a literature lover and want to place some essays, the theme provides [Custom Alignment](../markdown/align.md) and [footnote](../markdown/footnote.md).

- To store some knowledge notes, the theme provides [Mark](../markdown/mark.md), [Task list](../markdown/tasklist.md) and [Tex](../markdown/tex.md) support.

- If you are a programmer and need to show a lot of codes and demos, this theme provides light and dark themes for code blocks, code group component `<CodeGroup />` and the ["one-click copy" button](../feature/copy-code.md). At the same time, we also provide the [Code Demo](../markdown/demo.md) function, which is convenient for you to show your own Vue, React components or other demos.

- If you are providing product documentation and presentation, the theme provides [slide](../markdown/presentation.md), [flowchart](../markdown/flowchart.md), [mermaid diagram](../markdown/mermaid.md) functions.

In short, anyone can enjoy the convenience of Markdown’s enhanced syntax.

### Search engine enhancement

The theme provides [SEO Enhance](../feature/seo.md), which automatically injects meta tags into web pages to enhance search engine indexing.

The theme also provides [Sitemap Generation](../feature/sitemap.md) to generate Sitemap automatically.

### Page UI

- Homepage: Support for multiple action buttons, and the UI has been optimized.

- Page: [**page icon**](../interface/icon.md), [**article information**](../feature/page-info.md),**Title list**, picture preview function.

- Site structure: simplifie the configuration of [Navigation Bar](../layout/navbar.md) and [Sidebar](../layout/sidebar.md), add support for icons and path prefixes. At the same time, the theme added [**breadcrumb**](../layout/page.md#breadcrumb) and footer support.

### Blog

The theme provides [categories, tags](../blog/category-and-tags.md), [timeline](../blog/timeline.md), [star articles](../blog/article.md) and other functions. Also, the theme gives you a brand new [**blog homepage**](../blog/home.md), and also .

At the same time, the theme also provides common blog feature such as [**Comment**](../feature/comment.md) and [**Feed**](../feature/feed.md).
