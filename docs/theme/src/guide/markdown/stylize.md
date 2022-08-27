---
title: Stylize
icon: style
category:
  - Markdown
tag:
  - Stylize
  - Markdown
---

Create inline snippet by stylize inline tokens including changing tags, adding attributes and modifying content.

<!-- more -->

## Config

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          // options
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          // options
        ],
      },
    },
  }),
};
```

:::

## Usage

The `stylize` receives an array, where each element accepts 2 options:

- `matcher`: should be `string` or `RegExp`.

- `replacer`: a function cutomizing the matched token

For example, you can use the following cofig to transform `*Recommanded*` into a Badge `<Badge type="tip">Recommanded</Badge>`:

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            match: "Recommanded",
            replacer: ({ tag, attrs }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommanded",
                };
            },
          },
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            match: "Recommanded",
            replacer: ({ tag, attrs }) => {
              if (tag === "em")
                return {
                  tag: "Badge",
                  attrs: { type: "tip" },
                  content: "Recommanded",
                };
            },
          },
        ],
      },
    },
  }),
};
```

:::

<!-- markdownlint-disable MD033 -->

Another example is you want a to set all the emphsis `n't` words to red color, so that `Setting this to a invalid stytax *doesn't* have any effect.` becomes: "Setting this to a invalid stytax <span style="color:red">doesn't</span> have any effect."

<!-- markdownlint-enable MD033 -->

::: code-tabs#language

@tab TS

```ts
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            match: /n't$/,
            replacer: ({ tag, attrs, content }) => {
              if (tag === "em")
                return {
                  tag: "span",
                  attrs: { style: "color: red" },
                  content,
                };
            },
          },
        ],
      },
    },
  }),
});
```

@tab JS

```js
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      stylize: [
        {
          match: /n't$/,
          replacer: ({ tag, attrs, content }) => {
            if (tag === "em")
              return {
                tag: "span",
                attrs: { style: "color: red" },
                content,
              };
          },
        },
      ],
    }),
  ],
};
```

:::

If you want to skip some words in some pages, you can set `noStylize` in page frontmatter with an array containing content you don't want to stylize.

::: info Performance

To avoid preformance impact, you should try to avoid using RegExp for better performance unless you need it.

Also try to create snippets with RegExp having lower costs, e.g: RegExp starting with `^` and ending with `$`.

For example, if you only want to match "SHOULD", "MUST" and "MAY", you should write `/^(?:SHOULD|M(?:UST|AY))$/u` instead of `/SHOULD|MUST|MAY/u`. The fist one will only match 2 time with "A loo...oong content" with 1000 characters, but will match nearly 3000 times with the second RegExp.

:::
