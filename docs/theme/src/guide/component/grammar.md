---
title: Component
icon: puzzle-piece
order: 3
category:
  - Component
tag:
  - Component
  - Markdown
---

You can easily insert components in Markdown content with component code block.

<!-- more -->

## Settings

```ts twoslash {5} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    component: true,

    // other options...
  },
});
```

## Usage

You can use component fence block to add a component into your markdown content. Both YAML and JSON format props data are supported:

- YAML <Badge text="Recommended" type="tip" />:

  ````md
  ```component ComponentName
  # component data here
  ```
  ````

- JSON:

  ````md
  ```component ComponentName
  {
    // component data here
  }
  ```
  ````

## Demo

::: md-demo VPCard

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
background: rgba(253, 230, 138, 0.15)
```

```component VPCard
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "background": "rgba(253, 230, 138, 0.15)"
}
```

:::

`<VPCard>` here is a global component.

The above code blocks are equivalent to:

```md
<VPCard
  title="Mr.Hope"
  desc="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  link="https://mister-hope.com"
  background="rgba(253, 230, 138, 0.15)"
/>
```
