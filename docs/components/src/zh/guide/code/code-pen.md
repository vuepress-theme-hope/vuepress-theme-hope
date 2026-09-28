---
title: CodePen
---

在 Markdown 嵌入 CodePen 示例。

<!-- more -->

## 示例

<!-- #region demo -->

::: preview 一个使用用户和 Slug Hash 的案例

<CodePen
  user="kowlor"
  slug-hash="ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>

:::

::: preview 一个使用链接的案例

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Solar System animation - Pure CSS"
  :default-tab="['css','result']"
  :theme="$isDarkMode? 'dark': 'light'"
/>

:::

::: preview 一个点击运行的案例

<CodePen
  link="https://codepen.io/kowlor/pen/ZYYQoy"
  title="Envelope w/ Hearts"
  status="clicktorun"
  :theme="$isDarkMode? 'dark': 'light'"
/>

:::

<!-- #endregion demo -->

## 选项 {#options}

::: fields
@`link` type=string

CodePen 项目链接。

@`user` type=string required

CodePen 用户。未设置 `link` 时为必填。

@`slugHash` type=string required

CodePen 项目 slug hash。未设置 `link` 时为必填。

@`title` type=string

CodePen 项目标题。

@`height` type=number default=`380`

以 px 为单位的编辑器高度。

@`theme` type=`"default" | "light" | "dark"` default=`"default"`

编辑器主题。

@`status` type=`"autoload" | "preview" | "clicktorun"` default=`"preview"`

CodePen 嵌入演示状态。

- `"autoload"`: 页面加载时会加载 demo。
- `"preview"`: 演示的代码会被加载并显示预览按钮。
- `"clicktorun"`: 只有在用户单击“运行代码”按钮后才会加载演示。

@`defaultTab` type=`string[]` default=`["result"]`

编辑器默认打开的选项卡。

:::
