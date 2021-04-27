---
title: Components
icon: plugin
category: markdown
tags:
  - components
  - markdown
---

## Badge

Badge available in Markdown

### Badge Props

#### text

- Type: `string`
- Required: Yes

Text of the badge

#### type

- Type: `"tip" | "warn" | "error"`
- Default: `"tip"`

Badge types:

- <Badge text="tip" type="tip" vertical="middle" />
- <Badge text="warn" type="warn" vertical="middle" />
- <Badge text="error" type="error" vertical="middle" />

#### color

- Type: `string`
- Required: No

Badge color, please fill in CSS color strings

#### vertical

- Type: `"top" | "middle"`
- Default: `"top"`

Vertical position of the badge

### Badge Usage

You can use it in Markdown to add some status for titles or links:

```md
### Badge <Badge text="Building" type="warn"/> <Badge text="MrHope" color="grey" />
```

## CodeGroup, CodeGroupItem

CodeGroup available in Markdown

### CodeGroup Usage

Please use `<CodeGroup />` to wrap `<CodeGroupItem />`。

For each `<CodeGroupItem />`, you need to set `title` attribute as tab’s title，and put one code block per tab。You can also set `active` attribute on one of `<CodeGroupItem />` to make it active by default.

::: tip

You need to put a blank line between each `<CodeGroupItem />`, otherwise VuePress may not be able to parse them.

:::

### CodeGroup Demo

Input:

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

Output:

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
