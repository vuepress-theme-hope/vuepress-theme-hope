---
title: 指南
icon: lightbulb
---

使用 `vuepress-plugin-blog2`，你可以轻松地将博客功能引入主题。

## 插件的工作逻辑

```mermaid
flowchart TB
  subgraph user [用户侧]
    config[配置选项]
  end

  subgraph node [Node 侧]
    direction TB
    readConfig[读取你的配置]-->
    node2[通过 filter 选项\n确定文章页面]-->
    node3[通过 getInfo 选项\n提取文章信息]-->
    node4[将提取的信息\n注入 routeMeta 中]
    readConfig
    generatePage["生成页面\n注入 frontmatter 与布局"]
    writeTemp["将信息写入临时文件"]

    subgraph category [分类]
      direction TB
      loopCategory[遍历每个分类配置] --->
      getCategory["根据 getter 选项\n获取每个页面的对应分类"] -->
      mapCategory["建立\n'分类名称 → 对应页面'\n映射"]-->
      sortCategory["根据 sort 选项\n对每个分类的页面进行排序"]
      loopCategory -->
      getCategoryPage["读取\npath,\nlayout,\nfrontmatter,\nitemPath,\nitemLayout,\nitemFrontmatter\n选项"]
    end

    readConfig--->loopCategory
    getCategoryPage --> generatePage
    sortCategory --> writeTemp

    subgraph type [类别]
      direction TB
      loopType[遍历每个类别配置] --->
      getTypePage["读取\npath,\nlayout,\nfrontmatter\n选项"]
      loopType -->
      filterType["根据 filter 选项\n过滤页面"]-->
      sortType["根据 sort 选项\n排序页面"]
    end

    readConfig-->loopType
    getTypePage --> generatePage
    sortType --> writeTemp
    end

  subgraph client [客户端]
    direction TB
    readTemp[读取临时文件] --> callCategory
    readTemp --> callType
    callCategory["调用 useBlogCategory API"] -->
    getPage
    callType["调用 useBlogType API"]-->
    getPage
    getPage["通过临时文件中的 key 信息找到页面"] -->
    getInfo["使用页面路径从 routeMeta 中获取页面信息"] -->
    return["整理信息后返回"]
    visit["访问博客对应页面"]-->
    layout["载入相应布局\n并在 frontmatter 中获取相关信息"]
  end

  config-->readConfig
  writeTemp-->readTemp
  generatePage-->visit
```

上方的流程图可以帮助你了解插件的工作原理及其设计目标。

## 收集文章并生成信息

起步时，插件会首选过滤并选择那些需要作为文章的页面。这将剔除你不想要的页面，并在后续处理中排除它们。

::: note

默认情况下，所有从 Markdown 文件生成但不是主页的页面，都将被包含作为文章。

:::

你可能需要设置 `filter` 选项来完全自定义要收集的页面。 `filter` 接受一个形状为 `(page: Page) => boolean` 的函数。

接着，你应该设置 `getInfo` 选项为一个接受 `Page` 作为参数并返回包含所需信息的对象的函数。这样稍后，你可以从组合 API 中获取这些信息。

::: details 案例

```ts
// 主题入口
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  name: "vuepress-theme-xxx",
  plugins: [
    blogPlugin({
      filter: ({ filePathRelative, frontmatter }) => {
        // 舍弃那些不是从 Markdown 文件生成的页面
        if (!filePathRelative) return false;

        // 舍弃 `archives` 文件夹的页面
        if (filePathRelative.startsWith("archives/")) return false;

        // 舍弃那些没有使用默认布局的页面
        if (frontmatter.home || frontmatter.layout) return false;

        return true;
      },

      getInfo: ({ frontmatter, git = {}, data = {} }) => {
        // 获取页面信息
        const info: Record<string, any> = {
          author: frontmatter.author || "",
          categories: frontmatter.categories || [],
          date: frontmatter.date || git.createdTime || null,
          tags: frontmatter.tags || [],
          excerpt: data.excerpt || "",
        };

        return info;
      },
    }),
    // 其他插件 ...
  ],
};
```

:::

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
// 主题入口
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  name: "vuepress-theme-xxx",
  plugins: [
    blogPlugin({
      // 其他配置 ...
      category: [
        {
          key: "tag",
          getter: ({ frontmatter }) => frontmatter.tag || [],
          path: "/tag/",
          layout: "TagMap",
          frontmatter: () => ({ title: "标签页" }),
          itemPath: "/tag/:name/",
          itemLayout: "TagList",
          itemFrontmatter: (name) => ({ title: `${name}标签` }),
        },
      ],
    }),
    // 其他插件 ...
  ],
};
```

此外，你可能希望为你的一些文章加注星标，并将其展示给访问者。当你在 frontmatter 中设置 `star: true` 来标记它们时，你可能需要这样的配置来在 `/star/` 路径中以 `StarList` 布局显示它们:

```ts
// 主题入口
import { blogPlugin } from "vuepress-plugin-blog2";

export default {
  name: "vuepress-theme-xxx",
  plugins: [
    blogPlugin({
      // 其他配置 ...
      type: [
        {
          key: "star",
          filter: ({ frontmatter }) => frontmatter.star,
          path: "/star/",
          layout: "StarList",
          frontmatter: () => ({ title: "收藏页" }),
        },
      ],
    }),
    // 其他插件 ...
  ],
};
```

看，设置这两种类型很容易。有关完整选项，请参阅 [博客分类配置](./config.md#博客分类配置) 和 [博客分类配置](./config.md#博客类型配置)。

## 在客户端使用组合 API

当生成每个页面时，插件将在 `frontmatter.blog` 中设置如下信息

```ts
interface BlogFrontmatterOptions {
  /** 当前页面的类型 */
  type: "category" | "type";
  /** 在当前分类或类别下全局唯一的 key */
  key: string;
  /**
   * 当前的分类名称
   *
   * @description 仅在分类子项目页面中可用
   */
  name?: string;
}
```

所以你可以直接调用 `useBlogCategory()` 和 `useBlogType()`，结果将是当前路由绑定的类别或类型。

此外，你可以通过传递所需的 `key` 作为参数，来将获得绑定到该 `key` 的信息。

对于上方的 Node 配置而言，你可以在客户端通过如下方式获取 tag 和 star 的信息:

`TagMap` 布局:

```vue
<template>
  <div>
    <h1>Tag page</h1>
    <ul>
      <li v-for="({ items, path }, name) in categoryMap.map">
        <RouterLink :key="name" :to="path" class="category">
          {{ name }}
          <span class="category-num">
            {{ items.length }}
          </span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { useBlogCategory } from "vuepress-plugin-blog2";

const categoryMap = useBlogCategory("tag");
</script>
```

`TagList` 布局:

```vue
<template>
  <div>
    <h1>Tag page</h1>
    <div class="category-wrapper">
      <RouterLink
        v-for="({ items, path }, name) in categoryMap.map"
        :key="name"
        :to="path"
        class="category"
      >
        {{ name }}
        <span class="category-num">
          {{ items.length }}
        </span>
      </RouterLink>
    </div>
    <div class="article-wrapper" v-if="categoryMap.currentItems">
      <div v-if="!categoryMap.currentItems.length">Nothing in here.</div>
      <article
        v-for="{ info, path } in categoryMap.currentItems"
        class="article"
        @click="$router.push(path)"
      >
        <header class="title">
          {{
            (isTimeline
              ? `${new Date(info.date).toLocaleDateString()}: `
              : "") + info.title
          }}
        </header>
        <hr />
        <div class="article-info">
          <span v-if="info.author" class="author"
            >Author: {{ info.author }}</span
          >
          <span v-if="info.date && !isTimeline" class="date"
            >Date: {{ new Date(info.date).toLocaleDateString() }}</span
          >
          <span v-if="info.category" class="category"
            >Category: {{ info.category.join(", ") }}</span
          >
          <span v-if="info.tag" class="tag"
            >Tag: {{ info.tag.join(", ") }}</span
          >
        </div>
        <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useBlogCategory } from "vuepress-plugin-blog2";

const categoryMap = useBlogCategory("tag");
</script>
```

`StarList` 布局:

```vue
<template>
  <div class="article-wrapper" v-if="stars.items">
    <div v-if="!stars.items.length">Nothing in here.</div>
    <article
      v-for="{ info, path } in stars.items"
      class="article"
      @click="$router.push(path)"
    >
      <header class="title">
        {{
          (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : "") +
          info.title
        }}
      </header>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date && !isTimeline" class="date"
          >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
          >Category: {{ info.category.join(", ") }}</span
        >
        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(", ") }}</span>
      </div>
      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>
<script setup lang="ts">
import { useBlogType } from "vuepress-plugin-blog2/client";

import ArticleList from "../components/ArticleList.vue";
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";

const stars = useBlogType("star");
</script>
```

有关返回类型，请参阅 [Composition API 返回类型](./config.md#可组合式-API)。

## 多语言支持

该插件添加了原生多语言支持，因此你的设置将自动应用于每种语言。

例如，如果用户进行了以下 locales 配置，并且你正在设置上面的“star”示例:

```ts
// .vuepress/config.ts
export default {
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },
};
```

那么 `/zh/star/` 和 `/star/` 都将可用，并且只会显示对应语言下的文章。

## 摘要生成

这个插件提供了一个内置的摘要生成器，可以通过将 `excerpt` 选项设置为 `true` 来启用。

::: info 摘要介绍

摘要是一个 HTML 片段，被用于在博客列表中显示文章的简短描述，所以摘要有如下限制:

- 摘要不支持任何未知标签以及 Vue 语法，所以此类内容会在生成时被移除。如果你有自定义组件 (非 Vue 组件)，请配置 `isCustomElement` 选项。
- 由于摘要是一个 HTML 片段，所以你将无法通过相对路径或别名引入任何图片，这些图片会被直接移除。如果你想要保留图片，请使用基于 `.vuepress/public` 的绝对路径或完整路径以确保它们可以在其他地址被访问。

:::

摘要生成器将尝试从 Frontmatter 内容中找到有效的摘要分隔符，如果找到，它将使用分隔符之前的内容，分隔符默认为 `<!-- more -->`，并且你可以通过 `excerptSeparator` 选项来自定义它。

如果找不到有效的分隔符，它将从 Markdown 文件的开头开始解析内容，直到长度达到预设值时停止。该值默认为 `300`，你可以通过设置 `excerptLength` 选项来自定义它。

要选择哪个页面应该生成摘要，你可以使用 `excerptFilter` 选项。

::: tip 示例

通常，如果用户设置了 `frontmatter.description`，你可能希望使用它们，因此如果 `frontmatter.description` 不为空，你可以让过滤器函数返回 `false`。

::::
