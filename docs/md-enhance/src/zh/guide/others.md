---
title: 其他
icon: more
---

## 链接检查

`vuepress-plugin-md-enhance` 默认在开发模式下检查你的 Markdown 链接。

你可以通过插件选项中的 `linkCheck` 自定义此功能，你可以选择 `'always'`、`'never'`、`'dev'` 和 `'build'`。

## v-pre

由于 VuePress2 已经在 `@vuepress/core` 中移除了 V1 的 v-pre 容器，插件提供了一个选项支持它。也就是你可以在下面的容器中使用任何 Mustacle 语法。

```md
::: v-pre

{{ abc }}

:::
```

## 图片 ID 标记

GFM 支持通过 ID 标记图片，使得图片只在特定的模式显示。我们同时支持 GitHub 的标记与简易标记 `#light` 和 `#dark`。

你可以通过 `imageMark` 选项控制它。

```md
![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)
```

::: details 案例

上述演示会渲染如下结果

![GitHub Light](/assets/icon/github-light.png#gh-dark-mode-only)
![GitHub Dark](/assets/icon/github-dark.png#gh-light-mode-only)

![GitHub Light](/assets/icon/github-light.png#dark)
![GitHub Dark](/assets/icon/github-dark.png#light)

:::

### 高级用法

你可以将对象传递给 `imageMark` 以配置 ID 标记，可用选项有：

```ts
interface ImageMarkOptions {
  /** 仅限日间模式的 ID */
  light?: string[];
  /** 仅限夜间模式的 ID */
  dark?: string[];
}
```

## GFM

如果你的文档既在文档站点上提供又直接在 GitHub 上提供，我们提供了一个 `gfm` 选项来使你的 Markdown 行为与 GitHub 保持一致。

::: note

自定义容器在 `@vuepress/theme-default` 和 `vuepress-theme-hope` 中默认启用，但在 GitHub Markdown 预览中不可用。

:::
