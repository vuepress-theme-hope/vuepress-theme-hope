---
title: Blog Intro
icon: blog
order: 1
category:
  - Blog
tag:
  - Blog
  - Intro
---

The theme integrates `@vuepress/plugin-blog` for blog functionality. It is **disabled by default**. Set `plugins.blog: true` in the theme options to enable it.

<!-- more -->

## Page Configuration

Configure categories, tags, timeline visibility, stars, and sticky status via page Frontmatter.

::: tip[View the demo site](https://mister-hope.com/en/) to preview blog features.
:::

## UI Components

### Sidebar {#sidebar-header}

The blog information sidebar displays on the right side on desktop devices and collapses into the navigation sidebar on mobile devices.

### Pagination

A pagination component renders at the bottom of article lists. The default limit is `10` articles per page. Override this by setting `blog.articlePerPage` in the theme options.

## I18n Support

Blog configurations can be scoped per language via `locales` in the theme options. Article lists and timelines remain strictly independent across different languages.

## Limitations

::: warning Hot Reloading
To optimize performance, Hot Module Replacement (HMR) for blog metadata (categories, tags, sticky status, etc.) is disabled by default. You must restart the development server to apply metadata changes.

Metrics sensitive to Markdown content, such as reading time and word count, also bypass real-time updates.

To enforce real-time updates, set `hotReload: true` in the configuration. Note that each modification will trigger a full page reload and heavy recomputation, potentially causing temporary blank screens.
:::
