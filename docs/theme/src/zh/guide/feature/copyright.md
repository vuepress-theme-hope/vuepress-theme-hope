---
title: 版权信息
icon: copyright
category:
  - 功能
tag:
  - 功能
  - 版权信息
copy:
  triggerLength: 40
---

你可能不想让你的某些文章被他人复制，或者你想版权信息在复制时自动附加。

`vuepress-theme-hope` 通过 [`@vuepress/plugin-copyright`][copyright] 提供此功能。

::: info

`vuepress-theme-hope` 将主题选项中的 `plugins.copyright` 提供给 `@vuepress/plugin-copyright`。

:::

<!-- more -->

## 启用插件

由于相当一部分用户将本主题用于构建文档，而文档站点通常不需要附加版权信息，所以此插件并不是默认启用的。

要想启用此插件，你需要在主题选项中将 `plugins.copyright` 设置为 `true` 或是一个对象 (空对象也是可以的) 才能启用它。

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: true,
  },
});
```

::: tip

设置为 `true` 等同于设置 `{ global: true }`。

:::

- 当插件的 `global` 选项不为 `true` 时，插件全局禁用，你需要在需要的页面的 frontmatter 中设置 `copy: true` 手动开启。
- 设置 `global: true` 会使其全局生效，并允许在个别页面的 frontmatter 中设置 `copy: false` 禁用它。

处于不打扰用户的考虑，默认配置下，仅当用户复制字符长度不小于 `100` 时，才会触发追加版权信息，如果你希望改变这个触发值，请设置 `triggerLength`，同时该选项支持在 frontmatter 中通过 `copy.triggerLength` 单独设置。

```ts twoslash {7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      // 当复制的内容长度不小于 40 时，追加版权信息
      triggerLength: 40,
    },
  },
});
```

## 禁用复制和选择

- 如果你不希望用户复制你的整个站点或特定页面文字，你可以在主题选项中的 `plugins.copyright` 或在页面 frontmatter 中设置 `disableCopy` 来禁用复制，后者具有更高优先级。
- 如果你不希望用户选择你的整个站点或特定页面文字，你可以在主题选项中的 `plugins.copyright` 或在页面 frontmatter 中设置 `disableSelection` 来禁用选择，后者具有更高优先级。

```ts twoslash {7,10} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      // 禁用复制
      disableCopy: true,

      // 禁用选择
      disableSelection: true,
    },
  },
});
```

## 版权信息获取

你可以在主题选项中通过 `plugins.copyright.author` 和 `plugins.copyright.license` 选项设置作者和协议信息。

```ts twoslash {6,7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      author: "Mister Hope",
      license: "MIT",
    },
  },
});
```

如果文档的不同部分拥有不同的作者和协议，你可以传入一个使用当前页面对象作为参数的函数 `(page: Page) => string` 返回相应信息。

```ts twoslash {6} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    copyright: {
      licenseGetter: (page) =>
        page.path.startsWith("/cookbook/") ? "CC0" : "MIT",
    },
  },
});
```

## 演示

请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。请复制这段文字粘贴到任意地点查看效果。

## 更多

关于插件文档，请参见 [@vuepress/plugin-copyright 文档][copyright]。

[copyright]: https://ecosystem.vuejs.press/zh/plugins/features/copyright.html
