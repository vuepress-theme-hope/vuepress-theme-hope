---
title: Blog homepage
icon: home
category:
  - blog
tag:
  - home
  - blog
  - layout
---

`vuepress-theme-hope` allows you to enable a blog-style homepage.

You need to set `layout: Blog` and `home: true` in the frontmatter of homepage.

<!-- more -->

![Homepage screenshot](./assets/blog.png)

## Available parameters in frontmatter

### hero

- Type: `boolean`
- Default: `true`

Whether to display the icon and description of the home page.

### bgImage

- Type: `string`

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

`ProjectOption` including this keys:

- `type`: the project type, you can choose from `'link' | 'project' | 'book' | 'article'`
- `name`: required, project name
- `link`: required, project link, fill in an external path or absolute path
- `desc`: project description
- `cover`: project cover, fill in an external path or absolute path
