---
title: 样式化
icon: style
  - Markdown
tag:
  - 样式化
  - Markdown
---

创建行内 snippet，对内联标记进行样式化，包括更改标签、添加属性和修改内容。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {9-11}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          // 选项
        ],
      },
    },
  }),
});
```

@tab JS

```js {9-11}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          // 选项
        ],
      },
    },
  }),
};
```

:::

## 使用

`stylize` 接收一个数组，其中每个元素接受 2 个选项：

- `matcher`：应为 `string` 或 `RegExp`。

- `replacer`: 自定义匹配标记的函数

例如，你可以使用以下配置将 `*Recommended*` 转换为徽章 `<Badge type="tip">Recommended</Badge>`：

::: code-tabs#language

@tab TS

```ts {9-21}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
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
    },
  }),
});
```

@tab JS

```js {9-21}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
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
    },
  }),
};
```

:::

<!-- markdownlint-disable MD033 -->

另一个例子是你想要将所有的“不或者没”开头的强调词设置为红色，这样 `设置它*没有*任何效果，请*不要*这样使用。`变成：“设置它<span style="color:red">没有</span>任何效果，请<span style="color:red">不要</span>这样使用。"

<!-- markdownlint-enable MD033 -->

::: code-tabs#language

@tab TS

```ts {9-21}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        stylize: [
          {
            matcher: /n’t$/,
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
    },
  }),
});
```

@tab JS

```js {9-21}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      stylize: [
        {
          matcher: /n’t$/,
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
    }),
  ],
};
```

:::

如果你想跳过某些页面中的某些单词，你可以在页面 frontmatter 中设置 `noStylize` 数组，并放置你不想风格化的内容。

::: info 性能

为避免性能影响，除非你需要，否则应尽量避免使用 RegExp 以获得更好的性能。

并且请尝试使用成本较低的 RegExp 创建片段，例如：以 `^` 开头或以 `$` 结尾 RegExp 。

例如，如果你只想匹配 "SHOULD"、"MUST" 和 "MAY"，你应该写 `/^(?:SHOULD|M(?:UST|AY))$/u` 而不是 `/SHOULD|MUST|MAY/u`。第一个将和 1000 个字符的“A loo...oong content”只匹配 2 次，但第二个 RegExp 会匹配近 3000 次。

:::
