---
title: 组件
icon: plugin
category: markdown
tags:
  - components
  - markdown
---

## Badge

在 Markdown 中可用的徽章。

### Badge 属性

#### text

- 类型: `string`
- 必填: 是

徽章的文字

#### type

- 类型: `"tip" | "warn" | "error"`
- 默认值: `"tip"`

徽章的类型

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warn" type="warn" vertical="middle" />
- <Badge text="error" type="error" vertical="middle" />

#### color

- 类型: `string`
- 必填: 否

徽章的颜色，填入在 CSS 中合法的颜色值。

#### vertical

- 类型: `"top" | "middle"`
- 默认值: `"top"`

徽章的垂直方向的位置

### Badge 使用

你可以在 Markdown 中使用这个组件来为标题或链接添加一些状态:

```md
### Badge <Badge text="Building" type="warn"/> <Badge text="MrHope" color="grey" />
```

## CodeGroup, CodeGroupItem

在 Markdown 中可用的代码块分组

### CodeGroup 使用

请使用 `<CodeGroup />` 包裹 `<CodeGroupItem />`。

对于每个 `<CodeGroupItem />`，你需要设置 `title` 属性作为选项卡的标题，并仅在选项卡内放置一个代码块。你还可以在其中一个 `<CodeGroupItem />` 上设置 `active` 属性使其默认激活。

::: tip

你需要在每个 `<CodeGroupItem />` 之间放置一个空行，否则 VuePress 可能无法正确的解析它们。

:::

### CodeGroup 示例

输入:

````md
<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm" active>
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>
````

输出:

<CodeGroup>
<CodeGroupItem title="yarn">
```bash
yarn add -D vuepress-theme-hope
```
</CodeGroupItem>

<CodeGroupItem title="npm" active>
```bash
npm i -D vuepress-theme-hope
```
</CodeGroupItem>
</CodeGroup>
