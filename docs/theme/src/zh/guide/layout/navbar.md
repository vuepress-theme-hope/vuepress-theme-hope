---
title: 导航栏
icon: navbar
order: 1
category:
  - 布局
tag:
  - 布局
  - 导航栏
---

导航栏可能包含你的站点名称、[搜索框](#搜索框)、 [导航栏链接](#导航栏链接)、[多语言支持](https://v2.vuepress.vuejs.org/zh/guide/i18n.html)、[仓库链接](#git-仓库和编辑链接) 和 [外观弹窗](#外观弹窗)。它们均取决于你的配置。

<!-- more -->

## 导航栏链接

你可以在主题选项中通过 `navbar` 配置导航栏链接，它接受一个数组。

### 字符串格式

配置导航栏最简单的方式，是依次填入需要展示的页面文件的路径，这样导航栏的文字、图标和链接会自动通过对应文件生成。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: ["/zh/guide/README.md", "/zh/config/README.md", "/zh/faq.md"],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    navbar: ["/zh/guide/README.md", "/zh/config/README.md", "/zh/faq.md"],
  }),
};
```

:::

::: tip

你可以省略 `.md` 扩展名，以 `/` 结尾的路径会被推断为 `/README.md`。

:::

### 对象格式

如果你对页面的图标不满意或者觉得页面标题太长，你可以改为配置一个对象。可用的配置项有:

- `text:`: 项目文字
- `link`: 项目链接
- `icon`: 项目图标 (可选)
- `activeMatch`: 项目激活匹配 (可选)，支持正则字符串。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "指南",
        link: "/zh/guide/README.md",
        icon: "creative",
        // 仅在 `/zh/guide/` 激活
        activeMatch: "^/zh/guide/$",
      },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      {
        text: "常见问题",
        link: "/zh/faq.md",
        icon: "question",
        // 会在 `/zh/faq` 开头的路径激活
        // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
        activeMatch: "^/zh/faq",
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    navbar: [
      {
        text: "指南",
        link: "/zh/guide/README.md",
        icon: "creative",
        // 仅在 `/zh/guide/` 激活
        activeMatch: "^/zh/guide/$",
      },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      {
        text: "常见问题",
        link: "/zh/faq.md",
        icon: "question",
        // 会在 `/zh/faq` 开头的路径激活
        // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
        activeMatch: "^/zh/faq",
      },
    ],
  }),
};
```

:::

::: tip activeMatch 的高级用法

`activeMatch` 主要给予你控制路径是否激活的能力，比如你可能有如下链接:

- `/path/`
- `/path/a/`
- `/path/b/`

此时你可能想避免在 `/path/a/` 以及 `/path/b/` 开头的路径下，出现两个菜单同时激活的情况。将第一项的 `activeMatch` 选项设置为 `^/path/(?:(?!a/|b/).*)?$` 就可以有效避免。

:::

### 下拉列表

如果你需要展示较多的链接，你可以将同类链接整理成下拉列表。

你需要设置对象式导航栏配置项，并提供额外的 `children` 选项设置链接列表:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "基础",
        icon: "info",
        children: ["/zh/basic/markdown.md", "/zh/basic/vuepress.md"],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    navbar: [
      {
        text: "基础",
        icon: "info",
        children: ["/zh/basic/markdown.md", "/zh/basic/vuepress.md"],
      },
    ],
  }),
};
```

:::

由于大多数情况下，导航栏的分组项目都属于同一类别，会放在同一个子目录下，它们具有相同的路径前缀。

为了简化配置，你可以添加 `prefix` 字段为分组的每一个子链接添加一个前缀:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    navbar: [
      {
        text: "基础",
        icon: "info",
        prefix: "/zh/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
};
```

:::

此外，你还可以通过嵌套的 `children` 来在下拉列表中设置分组:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: [
      {
        text: "插件列表",
        icon: "plugin",
        children: [
          {
            text: "内置插件",
            children: [
              /* 一些子项目 */
            ],
          },
          {
            text: "外部插件",
            children: [
              /* 一些子项目 */
            ],
          },
        ],
      },
    ],
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    navbar: [
      {
        text: "插件列表",
        icon: "plugin",
        children: [
          {
            text: "内置插件",
            children: [
              /* 一些子项目 */
            ],
          },
          {
            text: "外部插件",
            children: [
              /* 一些子项目 */
            ],
          },
        ],
      },
    ],
  }),
};
```

:::

## 禁用导航栏

你可以设置 `navbar: false` 来禁用所有页面的导航栏:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: false,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    navbar: false,
  }),
};
```

:::

你也可以通过 `YAML front matter` 来禁用某个指定页面的导航栏:

```md
---
navbar: false
---
```

## 网站图标

你可以在主题选项中使用 `logo` 来配置站点的图标，请填入绝对路径。

::: note

请填写绝对路径并将 logo 放在 `.vuepress/public` 文件夹中。

:::

配置图标后，图标将移动设备上取代先前的站点名称显示在导航栏上。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    logo: "/logo.png",
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    logo: "/logo.png",
  }),
};
```

:::

::: tip

你可以在主题选项中设置 `logoDark` 以在深色模式下显示另一个 Logo。

:::

## 多语言

主题的导航栏支持 [多语言](https://v2.vuepress.vuejs.org/zh/guide/i18n.html)，所以你可以为每个语言单独设置上面提到的导航栏选项:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    locales: {
      "/": {
        logo: "/logo.svg",
        navbar: [
          /* 根目录下的英文配置 */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
          /* 中文目录下的中文配置 */
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    locales: {
      "/": {
        logo: "/logo.svg",
        navbar: [
          /* 根目录下的英文配置 */
        ],
      },
      "/zh/": {
        logo: "/zh-logo.svg",
        navbar: [
          /* 中文目录下的中文配置 */
        ],
      },
    },
  }),
};
```

:::

## 搜索框

`vuepress-theme-hope` 同默认主题一样，带来了搜索插件的内置支持。你可以根据自己的需要来自行添加插件并启用搜索功能。导航栏会自动出现对应的搜索框。

关于详情，详见 [功能 → 搜索](../feature/search.md)。

## Git 仓库和编辑链接

当你在主题选项中提供了 `repo` 选项，将会自动在每个页面的导航栏生成源文件仓库按钮。

你可以在主题选项中通过 `repoDisplay` 控制是否显示仓库按钮。

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    // 默认为 GitHub. 同时也可以是一个完整的 URL
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // 自定义仓库链接文字。默认从 `repo` 中自动推断为
    // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "GitHub",
    // 是否在导航栏内显示仓库链接，默认为 `true`
    repoDisplay: true,
  }),
});
```

@tab JS

```js
// .vuepress/config.js
const { hopeTheme } = require("vuepress-theme-hope");

module.exports = {
  theme: hopeTheme({
    // 默认为 GitHub. 同时也可以是一个完整的 URL
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // 自定义仓库链接文字。默认从 `repo` 中自动推断为
    // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" 其中之一，或是 "Source"。
    repoLabel: "GitHub",
    // 是否在导航栏内显示仓库链接，默认为 `true`
    repoDisplay: true,
  }),
};
```

:::

## 外观弹窗

提供下列三种功能:

- [主题色切换](../interface/theme-color.md)
- [深色模式](../interface/darkmode.md)
- [全屏按钮](../interface/others.md#全屏按钮)

## 相关助手与类型

`vuepress-theme-hope` 将导航栏的类型导出为 `HopeThemeNavbarConfig`，同时，提供了一个 `navbar` Helper 函数。它们可以在 TS 和 JS 中提供导航栏配置的校验与自动补全。

::: tip

它们主要应对当你将 VuePress 配置拆分成多个部分的情景。

:::

::: code-tabs#language

@tab TS Helper

```ts
// .vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* 你的导航栏配置 */
]);
```

@tab TS 类型

```ts
// .vuepress/navbar.ts
import type { HopeThemeNavbarConfig } from "vuepress-theme-hope";

const navbarConfig: HopeThemeNavbarConfig = [
  /* 你的导航栏配置 */
];

export default navbarConfig;
```

@tab JS

```js
// .vuepress/navbar.js
const { navbar } = require("vuepress-theme-hope");

module.exports = navbar([
  /* 你的导航栏配置 */
]);
```

:::

## 例子

:::: details 本文档的导航栏配置

::: code-tabs#language

@tab TS

```ts
@include(../../../.vuepress/navbar/zh.ts)
```

@tab JS

```js
const { navbar } = require("vuepress-theme-hope");

module.exports = navbar([
  "/zh/guide/",
  "/zh/config/",
  "/zh/faq/",
  {
    text: "教程",
    icon: "guide",
    prefix: "/zh/cookbook/",
    children: ["tutorial/", "markdown/", "vuepress/", "advanced/"],
  },
  "/zh/migration/",
  {
    text: "项目",
    icon: "info",
    prefix: "/zh/",
    children: [
      "changelog",
      "demo",
      "contribution",
      {
        text: "插件",
        icon: "plugin",
        children: [
          {
            text: "博客插件",
            icon: "blog",
            link: "https://vuepress-theme-hope.github.io/v2/blog/zh/",
          },
          {
            text: "评论插件",
            icon: "comment",
            link: "https://vuepress-theme-hope.github.io/v2/comment/zh/",
          },
          {
            text: "组件库",
            icon: "plugin",
            link: "https://vuepress-theme-hope.github.io/v2/components/zh/",
          },
          {
            text: "代码复制插件",
            icon: "copy",
            link: "https://vuepress-theme-hope.github.io/v2/copy-code/zh/",
          },
          {
            text: "版权信息插件",
            icon: "copyright",
            link: "https://vuepress-theme-hope.github.io/v2/copyright/zh/",
          },
          {
            text: "Feed 插件",
            icon: "rss",
            link: "https://vuepress-theme-hope.github.io/v2/feed/zh/",
          },
          {
            text: "LightGallery 插件",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/lightgallery/zh/",
          },
          {
            text: "Markdown 增强插件",
            icon: "markdown",
            link: "https://vuepress-theme-hope.github.io/v2/md-enhance/zh/",
          },
          {
            text: "图片预览插件",
            icon: "pic",
            link: "https://vuepress-theme-hope.github.io/v2/photo-swipe/zh/",
          },
          {
            text: "PWA 插件",
            icon: "app",
            link: "https://vuepress-theme-hope.github.io/v2/pwa/zh/",
          },
          {
            text: "阅读时间插件",
            icon: "read",
            link: "https://vuepress-theme-hope.github.io/v2/reading-time/zh/",
          },
          {
            text: "重定向插件",
            icon: "navigation",
            link: "https://vuepress-theme-hope.github.io/v2/redirect/zh/",
          },
          {
            text: "Sass 调色板插件",
            icon: "palette",
            link: "https://vuepress-theme-hope.github.io/v2/sass-palette/zh/",
          },
          {
            text: "Seo 插件",
            icon: "strong",
            link: "https://vuepress-theme-hope.github.io/v2/seo/zh/",
          },
          {
            text: "Sitemap 插件",
            icon: "sitemap",
            link: "https://vuepress-theme-hope.github.io/v2/sitemap/zh/",
          },
        ],
      },
    ],
  },
]);
```

:::

::::

[plugin-search]: https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
[plugin-docsearch]: https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html
