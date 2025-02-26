---
title: 导航栏
icon: window-maximize
order: 1
category:
  - 布局
tag:
  - 布局
  - 导航栏
---

导航栏包含:

- 站点名称
- [搜索框](#搜索框)
- [导航栏链接](#导航栏链接)
- [多语言选择菜单](https://vuejs.press/zh/guide/i18n.html)
- [仓库链接](#git-仓库和编辑链接)
- [外观弹窗](#外观弹窗)。

它们都是可配置的，你也可以[完全自定义导航栏布局](#布局配置)。

<!-- more -->

## 导航栏链接

你可以在主题选项中通过 `navbar` 配置导航栏链接，它接受一个数组。

### 字符串格式

配置导航栏最简单的方式，是依次填入需要展示的页面文件的路径，这样导航栏的文字、图标和链接会自动通过对应文件生成。

```ts twoslash {6} title=".vuepress/config.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    navbar: ["/guide/README.md", "/config/README.md", "/faq.md"],
  }),
});
```

::: tip

我们推荐你省略 `.md` 扩展名，以 `/` 结尾的路径会被推断为 `/README.md`。

:::

### 对象格式

如果你对页面的图标不满意或者觉得页面标题太长，你可以改为配置一个对象。可用的配置项有:

- `text:`: 项目文字
- `link`: 项目链接
- `icon`: 项目图标 (可选)
- `activeMatch`: 项目激活匹配 (可选)，支持正则字符串。

```ts twoslash {5-22} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "指南",
        link: "/zh/guide/README.md",
        icon: "lightbulb",
        // 仅在 `/zh/guide/` 激活
        activeMatch: "^/zh/guide/$",
      },
      { text: "配置", link: "/zh/config/README.md", icon: "config" },
      {
        text: "常见问题",
        link: "/zh/faq.md",
        icon: "circle-question",
        // 会在 `/zh/faq` 开头的路径激活
        // 所以当你前往 `/zh/faq/xxx.html` 时也会激活
        activeMatch: "^/zh/faq",
      },
    ],
  }),
};
```

::: tip activeMatch 的高级用法

`activeMatch` 给予你通过正则表达式控制路径是否激活的能力。

比如你可能有如下下拉列表:

- `/path/`
- `/path/a/`
- `/path/b/`

为了避免在 `/path/a/` 以及 `/path/b/` 开头的路径下出现多个菜单同时激活的情况。你可以将第一项的 `activeMatch` 选项设置为 `^/path/(?:(?!a/|b/).*)?$`。

:::

### 下拉列表

如果你需要展示较多的链接，你可以将同类链接整理成下拉列表。

你需要设置对象式导航栏配置项，并提供额外的 `children` 选项设置链接列表:

```ts twoslash {6-10} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "基础",
        icon: "circle-info",
        children: ["/zh/basic/markdown.md", "/zh/basic/vuepress.md"],
      },
    ],
  }),
};
```

由于大多数情况下，导航栏的分组项目都属于同一类别，会放在同一个子目录下，它们具有相同的路径前缀。

为了简化配置，你可以添加 `prefix` 字段为分组的每一个子链接添加一个前缀:

```ts twoslash {9,10} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "基础",
        icon: "circle-info",
        prefix: "/zh/basic/",
        children: ["markdown.md", "vuepress.md"],
      },
    ],
  }),
};
```

此外，你还可以通过嵌套的 `children` 来在下拉列表中设置分组:

```ts twoslash {12-14,18-20} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: [
      {
        text: "插件列表",
        icon: "puzzle-piece",
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

## 禁用导航栏

你可以在主题选项中设置 `navbar: false` 以全局禁用导航栏:

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbar: false,
  }),
};
```

你也可以通过 Frontmatter 来禁用某个指定页面的导航栏:

```md
---
navbar: false
---
```

## 站点图标

你可以在主题选项中使用 `logo` 来配置站点的图标，请填入绝对路径。

::: note

请填写绝对路径并将 logo 放在 `.vuepress/public` 文件夹中。

:::

配置图标后，图标将移动设备上取代先前的站点名称显示在导航栏上。

```ts twoslash {5} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    logo: "/logo.png",
  }),
};
```

::: tip

你可以在主题选项中设置 `logoDark` 以在深色模式下显示另一个 Logo。

:::

## 多语言

主题的导航栏支持 [多语言](https://vuejs.press/zh/guide/i18n.html)，所以你可以为每个语言单独设置上面提到的导航栏选项:

```ts twoslash {7-10,13-16} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
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

## 搜索框

`vuepress-theme-hope` 同默认主题一样，带来了搜索插件的内置支持。你可以根据自己的需要来自行添加插件并启用搜索功能。导航栏会自动出现对应的搜索框。

关于详情，详见 [功能 → 搜索](../feature/search.md)。

## Git 仓库和编辑链接

当你在主题选项中提供了 `repo` 选项，将会自动在每个页面的导航栏生成源文件仓库按钮。

你可以在主题选项中通过 `repoDisplay` 控制是否显示仓库按钮。

```ts twoslash {6,9,10} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    // 支持简写仓库名称，会解析到 GitHub 上，同时也可以是一个完整的 URL
    repo: "vuepress-theme-hope/vuepress-theme-hope",
    // 默认从 `repo` 内容中推断为以下之一：
    // "GitHub" / "GitLab" / "Gitee" / "Bitbucket" / "Source"
    repoLabel: "GitHub",
    repoDisplay: true,
  }),
};
```

## 外观弹窗

提供下列三种功能:

- [主题色切换](../interface/theme-color.md)
- [深色模式](../interface/darkmode.md)
- [全屏按钮](../interface/others.md#全屏按钮)

## 布局配置

你可以在主题选项中通过 `navbarLayout` 自定义导航栏，你可以在选项中通过 `start`、`center` 和 `end` 键中添加组件。

你可以直接使用以下内置组件名称:

- Brand: 站点品牌
- Links: 导航栏链接
- Language: 语言切换菜单
- Search: 搜索框
- Outlook: 外观弹窗
- Repo: 项目仓库

同时，你也可以全局注册自己的组件并使用它们。

我们默认使用以下选项:

```ts twoslash {5-9} title=".vuepress/config.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    navbarLayout: {
      start: ["Brand"],
      center: ["Links"],
      end: ["Language", "Repo", "Outlook", "Search"],
    },
  }),
};
```

## 相关助手与类型

`vuepress-theme-hope` 将导航栏的类型导出为 `NavbarOptions`，同时，提供了一个 `navbar` 帮助函数。

::: tip 它们主要应对当你将 VuePress 配置拆分成多个部分的情景。

:::

```ts twoslash title=".vuepress/navbar.ts"
import { navbar } from "vuepress-theme-hope";

export default navbar([
  /* 你的导航栏配置 */
]);
```

## 例子

::: details 本文档的导航栏配置

```ts twoslash
import { navbar } from "vuepress-theme-hope";

<!-- @include: ../../../.vuepress/navbar/zh.ts#config -->
```

:::
