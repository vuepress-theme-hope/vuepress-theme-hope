---
title: 内置组件
icon: puzzle-piece
order: 4
category:
  - 组件
tag:
  - 组件
  - Markdown
---

通过 `vuepress-plugin-components`，你可以在 Markdown 文件中导入并使用一些组件。

可用组件:

- ArtPlayer: 由 ArtPlayer 驱动的视频播放器。
- Badge: 多彩的徽章组件
- BiliBili: 嵌入 BiliBili 视频
- CodePen: 嵌入 CodePen 演示
- PDF: 嵌入 PDF 查看器
- Share: 通过社交媒体分享当前页面
- StackBlitz: 嵌入 StackBlitz 演示
- SiteInfo: 显示站点
- VPBanner: 一个横幅组件
- VPCard: 一个卡片组件
- VidStack: 由 VidStack 驱动的音频/视频播放器

为了启用组件，你需要将 `plugins.components.components` 设置为一个组件名的数组。

<!-- more -->

::: note

`<Badge />` 是默认可用的，以便与 `@vuepress/theme-default` 行为一致。

:::

```ts twoslash {7-20} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  plugins: {
    components: {
      // 你想使用的组件
      components: [
        "ArtPlayer",
        "Badge",
        "BiliBili",
        "CodePen",
        "PDF",
        "Share",
        "SiteInfo",
        "StackBlitz",
        "VPBanner",
        "VPCard",
        "VidStack",
      ],
    },
  },
});
```

有关内置组件可用属性及其配置，请参阅 [组件库 - 插件选项](https://plugin-components.vuejs.press/zh/config.html) 页面。
