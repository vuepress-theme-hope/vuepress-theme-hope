---
title: 信息 Frontmatter 配置
icon: circle-info
order: 1
category:
  - 配置
tag:
  - Frontmatter
  - 信息
---

你可以在页面的 frontmatter 配置以下选项设置页面相关信息。

## 选项 {#options}

:::: fields
@`title` type=string

当前页面内容标题，默认为 Markdown 文件中的第一个 h1 标签内容。

@`shortTitle` type=string

当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。

@`description` type=string

当前页面内容描述。

@`icon` type=string

当前页面图标的 FontClass 或文件路径 (建议填写)。

参考：[界面 → 图标支持](../../guide/interface/icon.md)。

@`author` type=`Author | boolean`

作者，如果不填，则会回退到默认作者。

`Author` 类型为：

```ts
type AuthorName = string;

interface AuthorInfo {
  /**
   * 作者姓名
   */
  name: string;

  /**
   * 作者网站
   */
  url?: string;

  /**
   * 作者 Email
   */
  email?: string;
}

type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];
```

参考：[功能 → 页面信息](../../guide/feature/page-info.md#author)。

::: tip

在主题选项中指定默认作者时，可以设置 `false` 以防止显示默认作者。

:::

@`isOriginal` type=boolean

当前文章是否为原创。

参考：[功能 → 页面信息](../../guide/feature/page-info.md#parameters)。

@`date` type=`DateString`

写作时间，格式: `YYYY-MM-DD` 或 `YYYY-MM-DD hh:mm:ss`。

参考：[功能 → 页面信息](../../guide/feature/page-info.md#writing-date)。

@`category` type=`string | string[]`

分类。

参考：[功能 → 页面信息](../../guide/feature/page-info.md#category-and-tags)。

@`tag` type=`string | string[]`

标签。

参考：[功能 → 页面信息](../../guide/feature/page-info.md#category-and-tags)。

@`license` type=string default="主题选项中的值"

页面的协议名称。

参考：[布局 → 页脚](../../guide/layout/footer.md#copyright-information)。

@`copyright` type=`string | false` default="主题选项中的值"

页面的版权信息，会在页脚中显示。

参考：[布局 → 页脚](../../guide/layout/footer.md#copyright-information)。

@`pageview` type=boolean default="主题选项中的值"

是否显示浏览量。

参考：[功能 → 评论](../../guide/feature/comment.md#waline)。

::: tip

显示浏览量功能需要你拥有有效的 Waline 评论服务配置。

:::

@`article` type=boolean default=`true`

是否将该文章添加至文章列表中。

参考：[博客 → 文章](../../guide/blog/article.md#article-configuration)。

@`timeline` type=boolean default=`true`

是否将该文章添加至时间线中。

参考：[博客 → 时间线](../../guide/blog/timeline.md#excluding-articles)。

@`sticky` type=`boolean | number`

是否在列表中置顶。当填入数字时，数字越大，排名越靠前。

参考：[博客 → 文章](../../guide/blog/article.md#article-configuration)。

@`star` type=`boolean | number`

是否标为星标文章。当填入数字时，数字越大，排名越靠前。

参考：[博客 → 文章](../../guide/blog/article.md#star-articles)。

@`cover` type=string

页面的预览图。

参考：[常见问题 → 配置中的链接](../../faq/common-question.md#links-in-config)。

@`banner` type=string

页面的宽屏分享图。

参考：[常见问题 → 配置中的链接](../../faq/common-question.md#links-in-config)。

::::
