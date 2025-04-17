---
title: 公告
icon: bell
category:
  - 功能
tag:
  - 功能
  - 公告
---

VuePress Theme Hope 允许你通过 [`@vuepress/plugin-notice`][notice] 添加公告。

<!-- more -->

## 介绍

你可以通过主题选项的 `plugins.notice`为站点的不同路径设置多个公告。

每个公告配置需要包含一个 `path` 或 `match` 选项，用于匹配路径。`path` 选项为字符串，匹配所有以此开头的路径，`match` 选项为正则表达式以和所有路由测试匹配。

一个公告配置包括:

- `title`: 通知标题，支持文本和 HTMLString
- `content`: 通知内容，支持文本和 HTMLString
- `actions`: 通知操作

  应该是包含以下内容的对象数组:

  - `text`: 动作文本
  - `link` (可选): 操作链接。

    绝对路径会被当作内部路处理，完整 URL 被当作外部链接在新窗口打。

  - `type` (可选): `"default"` 或 `"primary"`

    默认值为 `"default"`。

这是一个例子:

```ts twoslash {5-32} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    notice: [
      {
        path: "/",
        title: "Notice Title",
        content: "Notice Content",
        actions: [
          {
            text: "Primary Action",
            link: "https://theme-hope.vuejs.press/",
            type: "primary",
          },
          { text: "Default Action" },
        ],
      },
      {
        path: "/zh/",
        title: "Notice Title",
        content: "Notice Content",
        actions: [
          {
            text: "Primary Action",
            link: "https://theme-hope.vuejs.press/",
            type: "primary",
          },
          { text: "Default Action" },
        ],
      },
    ],
  },
});
```

此外，我们还为你提供了一些高级选项来控制通知显示。

::: info 通知显示控件

默认情况下，每当用户进入网站时都会显示该通知，如果用户关闭该网站，该通知将在此期间保持关闭状态。

为了防止在用户关闭通知后下次访问时再次显示通知，你可以在公告配置中设置 `showOnce: true`。

另外，通知记忆是根据通知标题和通知内容来记忆的，你可以设置 `key` 选项来使用你想要的记忆键值，这样你就可以编辑通知而不会打扰已经确认过的用户。

:::

::: info 全屏

如果要显示全屏弹出窗口，可以在公告配置中使用 `fullscreen: true`。我们建议你将它与 `confirm: true` 一起使用。

通知将显示在屏幕中央，其他地方将被模糊遮罩覆盖。

:::

::: info 关闭逻辑

默认情况下，通知右侧会有一个关闭按钮，用户可以点击关闭。

但是，如果你希望用户确认通知，你可以设置 `confirm: true`，这样用户只能通过点击操作按钮来关闭通知。

:::

[notice]: https://ecosystem.vuejs.press/zh/plugins/features/notice.html
