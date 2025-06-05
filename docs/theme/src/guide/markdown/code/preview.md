---
title: Preview
icon: file-code
order: 2
category:
  - Markdown
tag:
  - Code Tabs
  - Markdown
---

The theme provides you preview support.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    preview: true,
  },
});
```

## Usage

You can use a `preview` container to display a piece of content and it's source code.

If the displayed code differs from the source code of content, you can also use `<VPPreview>` component with its `code` and `content` slots.

## Demo

:::: preview

::: preview Optional title

Some content here.

:::

<VPPreview>

<template #code>

```js
document.innerHTML = "Hello, world!";
```

</template>
<template #content>

Hello, world!

</template>

</VPPreview>

::::
