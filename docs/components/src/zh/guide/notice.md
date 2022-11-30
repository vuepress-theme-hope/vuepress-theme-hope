---
title: Notice
---

该插件提供了一个全局组件 `Notice` 供您向访问者显示一些通知。

您可以通过插件选项中的“通知”选项进行配置。

<!-- more -->

## 用法

您应该设置 `notice.locale`，其中键是语言环境路径，值是通知配置。

公告配置包括:

- `title`: 通知标题，支持文本和 HTMLString
- `content`: 通知内容，支持文本和 HTMLString
- `actions`: 通知操作

  应该是包含以下内容的对象数组:

  - `text`: 动作文本
  - `link` (可选): 操作链接。

    Pathname 会被当作内部路由链接由 router 处理，绝对链接会被当作外部链接在新窗口打开。

  - `type` (可选): `"default"` 或 `"primary"`

    默认值为 `"default"`。

这是一个例子:

```ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      notice: {
        locales: {
          "/": {
            title: "Notice",
            content: "You may want to check official docs",
            actions: [
              {
                text: "Check it now",
                link: "https://vuepress-theme-hope.github.io/v2/components/notice.html",
                type: "primary",
              },
              { text: "Later" },
            ],
          },
          "/zh/": {
            title: "通知",
            content: "你可能想要查看官方文档",
            actions: [
              {
                text: "现在查看",
                link: "https://vuepress-theme-hope.github.io/v2/components/notice.html",
                type: "primary",
              },
              { text: "稍后" },
            ],
          },
        },
      },
    }),
  ],
};
```

## 高级用法

此外，我们还为您提供了一些高级选项来控制通知显示。

::: info 通知显示控件

默认情况下，每当用户进入网站时都会显示该通知，如果用户关闭该网站，该通知将在此期间保持关闭状态。

为了防止在用户关闭通知后下次访问时再次显示通知，您可以在插件选项中设置 `notice.showOnce: true`。

另外，通知记忆是根据通知标题和通知内容来记忆的，你可以设置 `noticeKey` 选项来使用你想要的记忆键值，这样你就可以编辑通知而不会打扰已经确认过的用户。

:::

::: info 关闭逻辑

默认情况下，通知右侧会有一个关闭按钮，用户可以点击关闭。

但是，如果您希望用户确认通知，您可以设置 `notice.confirm: true`，这样用户只能通过点击操作按钮来关闭通知。

:::

::: info 全屏

如果要显示全屏弹出窗口，可以在插件选项中使用 `notice.fullscreen: true`。我们建议您将它与 `notice.confirm: true` 一起使用。

通知将显示在屏幕中央，其他地方将被模糊遮罩覆盖。

:::
