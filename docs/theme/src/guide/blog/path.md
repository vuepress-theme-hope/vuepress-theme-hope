---
title: Blog Page Path
icon: link
category:
  - Blog
tag:
  - Blog
  - Path
---

You can control the path of each page in the blog through `themeConfig.plugins.blog`.

The default paths provided by the blog are as follows, if they conflict with your existing paths, and you don't want to adjust your own paths, you can modify them.

| Options        | Description                   | Default Path       |
| -------------- | ----------------------------- | ------------------ |
| `article`      | list of articles              | `/article/`        |
| `category`     | Category map page             | `/category/`       |
| `categoryItem` | A list of specific categories | `/category/:name/` |
| `tag`          | Tag map page                  | `/tag/`            |
| `tagItem`      | list of specific tags         | `/tag/:name/`      |
| `encrypted`    | List of encrypted articles    | `/encrypted/`      |
| `slides`       | List of slides                | `/encrypted/`      |
| `star`         | List of starred articles      | `/encrypted/`      |
| `timeline`     | Timeline list                 | `/timeline/`       |
