---
title: 指南
icon: creative
---

使用 `vuepress-plugin-blog2`，你可以轻松地将博客功能引入主题。

## 收集文章并生成信息

起步时，插件会选择那些需要作为文章的页面。这只是第一步：剔除你不想要的页面。默认情况下，所有从 Markdown 文件生成但不是主页的页面，都将被包含作为文章。

你可能需要设置 `filter` 选项来完全自定义要收集的页面。 `filter` 接受一个形状为 `(page: Page) => boolean` 的函数。

然后，你应该设置 `getInfo` 选项为一个接受 `Page` 作为参数并返回包含所需信息的对象的函数。稍后，你可以从组合 API 中获取这些信息。

## 自定义类别和类型

基本上，你的博客中需要两种类型的收藏:

- 类别:

  “类别”是用文章的标签 (或类别) 对它们进行分组。

  例如，每篇文章可能都有对应的“分类”和“标签”。

- 类型:

  “类型”是过滤不同条件的文章。

  例如，你的帖子中可能有日记或笔记。当帖子带有写作日期信息时，它可以称为“时间线项目”。

了解这两种类型的描述后，你可以设置 `category` 和 `type` 选项，它们都接受一个数组，每个元素代表一个配置。

让我们从此处 2 个例子开始。

假设你想为每篇文章设置标签，并且你正在通过 `frontmatter.tag` 设置它们。同时，你想要在 `/tag/` 中使用 `TagMap` 布局的标签页面，并在`/tag/标签名称` 中使用 `TagList` 布局对标签按名称进行分组，你可能需要这样的配置:

```ts
({
  category: [
    {
      key: "tag",
      getter: ({ frontmatter }) => frontmatter.tag || [],
      path: "/tag/",
      layout: "TagMap",
      itemPath: "/tag/:name/",
      itemLayout: "TagList",
    },
  ],
});
```

此外，你可能希望为你的一些文章加注星标，并将其展示给访问者。当你在 frontmatter 中设置 `star: true` 来标记它们时，你可能需要这样的配置来在 `/star/` 路径中以 `StarList` 布局显示它们:

```ts
({
  type: [
    {
      key: "star",
      filter: ({ frontmatter }) => frontmatter.star,
      path: "/star/",
      layout: "StarList",
    },
  ],
});
```

看，设置这两种类型很容易。有关完整选项，请参阅 [博客分类配置](./config.md#博客分类配置) 和 [博客分类配置](./config.md#博客类型配置)。

## 在客户端使用组合 API

当生成每个页面时，插件将在 `frontmatter.blog` 中设置`type` (值为 `"category"` 或 `"type"`)、`key` 和 `name` (仅适用于类别页面)。

所以你可以直接调用 `useBlogCategory()` 和 `useBlogType()`，结果将是当前路由绑定的类别或类型。

此外，你可以通过传递所需的 `key` 作为参数，来将获得绑定到该 `key` 的信息。

有关返回类型，请参阅 [Composition API 返回类型](./config.md#可组合式-API)。
