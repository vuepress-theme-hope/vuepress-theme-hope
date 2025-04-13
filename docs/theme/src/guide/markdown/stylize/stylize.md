---
title: Stylize
icon: wand-magic-sparkles
order: -1
category:
  - Markdown
tag:
  - Stylize
  - Markdown
---

Stylize inline tokens including changing tags, adding attributes and modifying content.

<!-- more -->

## Settings

```ts twoslash {5-7} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    stylize: [
      // your options...
    ],
  },
});
```

## Usage

The `stylize` receives an array, where each element accepts 2 options:

- `matcher`: should be `string` or `RegExp`.

- `replacer`: a function customizing the matched token

For example, you can use the following config to transform `*Recommended*` into a Badge `<Badge type="tip">Recommended</Badge>`:

```ts twoslash {5-17} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
  },
});
```

Another example is you want to set all the emphasis `n't` words to red color, so that `Setting this to a invalid syntax *doesn't* have any effect.` becomes: "Setting this to an invalid syntax <span style="color:red">doesn't</span> have any effect."

```ts twoslash {5-17} title=".vuepress/theme.ts"
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    stylize: [
      {
        matcher: /n't$/,
        replacer: ({ tag, attrs, content }) => {
          if (tag === "em")
            return {
              tag: "span",
              attrs: { ...attrs, style: "color: red" },
              content,
            };
        },
      },
    ],
  },
});
```

Also, you can use `stylize` in frontmatter to provide extra stylize rules for content of the page.

::: info Performance

To avoid performance impact, you should try to avoid using RegExp for better performance unless you need it.

Also try to create snippets with RegExp having lower costs, e.g: RegExp starting with `^` and ending with `$`.

For example, if you only want to match "SHOULD", "MUST" and "MAY", you should write `/^(?:SHOULD|M(?:UST|AY))$/u` instead of `/SHOULD|MUST|MAY/u`. The fist one will only match 2 time with "A loo...oong content" with 1000 characters, but will match nearly 3000 times with the second RegExp.

:::
