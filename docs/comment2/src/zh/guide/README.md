---
title: 指南
icon: lightbulb
---

## 设置选项

你既可以在 Node.js 一侧使用插件选项设置选项，也可以通过客户端配置文件在浏览器一侧设置选项。

::: tabs

@tab 通过插件选项

```ts
import { commentPlugin } from "vuepress-plugin-comment2";

// .vuepress/config.ts
export default {
  plugins: [
    commentPlugin({
      provider: "Artalk", // Artalk | Giscus | Waline | Twikoo

      // 在这里放置其他选项
      // ...
    }),
  ],
};
```

@tab 通过客户端配置文件

```ts
// .vuepress/client.ts
import { defineClientConfig } from "@vuepress/client";
import {
  defineArtalkConfig,
  // defineGiscusConfig,
  // defineTwikooConfig,
  // defineWalineConfig,
} from "vuepress-plugin-comment2/client";

defineArtalkConfig({
  // 选项
});

export default defineClientConfig({
  // ...
});
```

:::

但是有以下你需要注意的限制：

- `provider`、多语言设置和其他资源相关选项必须在插件选项中设置。

  为确保 tree-shaking 有效，我们必须在 Node 一侧优化入口，以便打包器可以了解最终打包中应包含哪些资源。

  这些选项将在配置参考中用 <Badge text="仅限插件选项" type="warning"/> 标记。

- 不能序列化为 JSON 的选项必须在客户端配置中设置。

  接收复杂值的选项（例如：函数）不能在插件选项中设置，因为插件运行在 Node.js 环境下，所以我们无法将这些值和它们的上下文传递给浏览器。

  这些选项将在配置参考中用 <Badge text="仅限客户端配置" type="warning"/> 标记。

## 添加评论

该插件全局注册了一个组件 `<CommentService />`。

- 如果你是用户，你应该使用 `alias` 和布局槽来插入组件。 我们建议你在 `<PageNav />` 组件之后插入评论组件 (`<CommentService />`)，并且[这里有一个 demo](../demo.md) 使用默认主题供参考。
- 如果你是主题开发者，你应该将这个组件插入到你的主题布局中。

## 评论状态

默认情况下，`<CommentService />` 组件是全局启用的，你可以在插件选项和页面 frontmatter 中使用 `comment` 选项来控制它。

- 你可以通过在页面 frontmatter 中设置 `comment: false` 在本地禁用它。

- 要使其全局禁用，请在插件选项中将 `comment` 设置为 `false`。 然后你可以在页面 frontmatter 中设置 comment: true 以在局部启用它。

## 评论标识

你可以在页面 frontmatter 中设置 commentID 选项来自定义评论 ID，该 ID 用于标识要用于页面的评论存储项。

默认情况下，它将是页面的 `path` ，这意味着如果你将站点部署到多个位置，站点间具有相同内容的页面将共享相同的评论数据。

## 评论服务

目前你可以选择 Giscus、Waline、 Twikoo 和 Artalk。

::: tip 选择评论服务

你的博客或文档的目标人群:

- 程序员和开发人员: Giscus
- 公众: Waline

:::

- [Giscus 指南](giscus.md)

- [Waline 指南](waline.md)

- [Twikoo 指南](twikoo.md)

- [Artalk 指南](artalk.md)
