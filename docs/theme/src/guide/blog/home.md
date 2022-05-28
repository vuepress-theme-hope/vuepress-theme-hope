---
title: Blog homepage
icon: home
order: 6
category:
  - Blog
tag:
  - Blog
  - Home
  - Layout
---

`vuepress-theme-hope` allows you to enable a blog-style homepage.

You need to set `layout: Blog` and `home: true` in the frontmatter of homepage.

<!-- more -->

![Homepage screenshot](./assets/blog-light.png#light)
![Homepage screenshot](./assets/blog-dark.png#dark)

## Frontmatter Options

### hero

- Type: `boolean`
- Default: `true`

Whether to display the icon and description of the home page.

### bgImage

- Type: `string | false`

For the address of the background picture, you must fill in the absolute path. If not filled in, a default landscape picture will be automatically applied.

### bgImageStyle

- Type: `Record <string, string>`

The CSS style of the background image.

### heroImageStyle

- Type: `Record <string, string>`

CSS style for home icon

### heroFullScreen

- Type: `boolean`
- Default: `false`

Whether Hero is full screen displayed

### projects

- Type: `ProjectOption[]`

`ProjectOption` includes:

- `name`: required, project name
- `link`: required, project link, fill in an external path or absolute path
- `desc`: project description
- `icon`: Icon, you can fill in full path or absolute path image link, also icon FontClass is supported

  We provide these icons as built-in support either: `"link"`, `"project"`, `"book"`, `"article"`, `"friend"`。
