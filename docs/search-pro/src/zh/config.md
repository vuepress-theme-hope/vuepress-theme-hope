---
title: 插件选项
icon: config
---

## indexContent

- 类型: `boolean`
- 默认值: `false`

是否索引内容。

::: tip

默认情况下，插件只会索引页面的标题和摘要以及你的自定义索引项，不会索引页面的正文内容。如果需要索引页面的正文内容，可以将该选项设置为 `true`。

:::

## customFields

- 类型: `SearchProCustomFieldOptions[]`

  ```ts
  interface SearchProCustomFieldOptions {
    /**
     * 自定义项目的获取器
     */
    getter: (page: Page) => string | string[] | null;

    /**
     * 展示的内容
     *
     * @description `$content` 会被 `getter` 返回的内容替换
     *
     * @default `$content`
     */
    formatter?: string | Record<string, string>;
  }
  ```

- 必填: 否

自定义搜索项目。

::: tip 例子

假如你的主题在 Frontmatter 中使用 category 和 tag 标记文章的分类和标签，你可以使用以下配置：

```ts
import { defineUserConfig } from "vuepress";
import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  // 我们假定你在使用如下多语言
  locales: {
    "/": {
      lang: "en-US",
    },
    "/zh/": {
      lang: "zh-CN",
    },
  },

  plugins: [
    searchProPlugin({
      customFields: [
        {
          name: "category",
          getter: (page) => page.frontmatter.category,
          formatter: {
            "/": "Category: $content",
            "/zh/": "分类：$content",
          },
        },
        {
          name: "tag",
          getter: (page) => page.frontmatter.tag,
          formatter: {
            "/": "Tag: $content",
            "/zh/": "标签：$content",
          },
        },
      ],
    }),
  ],
});
```

:::

## hotKeys

- 类型: `SearchProHotKeyOptions[]`

  ```ts
  interface SearchProHotKeyOptions {
    /**
     * 热键的 `event.key` 值
     */
    key: string;

    /**
     * 是否同时按下 `event.altKey`
     *
     * @default false
     */
    alt?: boolean;

    /**
     * 是否同时按下 `event.ctrlKey`
     *
     * @default false
     */
    ctrl?: boolean;

    /**
     * 是否同时按下 `event.shiftKey`
     *
     * @default false
     */
    shift?: boolean;
  }
  ```

- 默认值: `[{key: 'k', ctrl: true}]`

指定热键的 [event.key](http://keycode.info/)。

当热键被按下时，搜索框的输入框会被聚焦，设置为空数组以禁用热键。

## hotReload

- 类型: `boolean`
- 默认值: `false`

是否在开发服务器中中启用实时热重载。

::: note

它是默认禁用的，因为此功能会对内容巨大的站点产生极大性能影响，并且在编辑 Markdown 时剧烈增加热重载的速度。

通常情况下，在开发中，用户并不需要实时更新索引数据库。

:::

## locales

- 类型: `SearchProLocaleConfig`

  ```ts
  /**
   * `vuepress-plugin-search-pro` 插件的多语言配置
   */
  interface SearchProLocaleData {
    /**
     * 搜索框占位符文字
     */
    placeholder: string;

    /**
     * 搜素文字
     */
    search: string;

    /**
     * 关闭文字
     */
    close: string;

    /**
     * 选择提示
     */
    select: string;

    /**
     * 选择提示
     */
    navigate: string;

    /**
     * 关闭提示
     */
    exit: string;

    /**
     * 加载提示
     */
    loading: string;

    /**
     * 无结果提示
     */
    empty: string;
  }

  interface SearchProLocaleConfig {
    [localePath: string]: SearchProLocaleData;
  }
  ```

- 必填: 否

搜索插件的多语言配置。
