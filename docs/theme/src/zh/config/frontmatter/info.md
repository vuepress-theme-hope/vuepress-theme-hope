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

## title

- 类型: `string`
- 必填: 否

当前页面内容标题，默认为 Markdown 文件中的第一个 h1 标签内容。

## shortTitle

- 类型: `string`
- 必填: 否

当前页面的短标题，会在导航栏、侧边栏和路径导航中作为首选。

## description

- 类型: `string`
- 必填: 否

当前页面内容描述。

## icon

- 类型: `string`
- 必填: 否
- 详情:
  - [指南 → 图标支持](../../guide/interface/icon.md)

当前页面图标的 FontClass 或文件路径 (建议填写)。

## author

- 类型: `Author | boolean`

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

- 必填: 否

作者，如果不填，则会回退到默认作者。

::: tip

在主题选项中指定默认作者时，可以设置 `false` 以防止显示默认作者。

:::

## isOriginal

- 类型: `boolean`
- 默认值: `false`

当前文章是否为原创。

## date

- 类型: `DateString`
- 必填: 否
- 格式: `YYYY-MM-DD` 或 `YYYY-MM-DD hh:mm:ss`

写作时间。

## category

- 类型: `string | string[]`
- 必填: 否

分类。

## tag

- 类型: `string | string[]`
- 必填: 否

标签。

## license

- 类型: `string`
- 默认值: 主题选项中的值

页面的协议信息。设置后协议文字将会展现在页脚。

更多详情请看 [页面 → 页脚支持](../../guide/layout/footer.md)

## sticky

- 类型: `boolean | number`
- 默认值: `false`

是否在列表中置顶。当填入数字时，数字越大，排名越靠前。

## star

- 类型: `boolean | number`
- 默认值: `false`

是否标为星标文章。当填入数字时，数字越大，排名越靠前。

## article

- 类型: `boolean`
- 默认值: `true`

是否将该文章添加至文章列表中。

## timeline

- 类型: `boolean`
- 默认值: `true`

是否将该文章添加至时间线中。

## image

- 类型: `string`
- 必填: 否

设置预览图 (分享图)，请填入绝对路径。

## banner

- 类型: `string`
- 必填: 否

设置横幅图片 (宽屏分享图)，请填入绝对路径。
