---
title: 脚注
icon: footnote
category:
  - Markdown
tag:
  - Markdown
  - 脚注
---

让你的 VuePress 站点中的 Markdown 文件支持脚注。

<!-- more -->

## 配置

:::: code-group

::: code-group-item TS

```ts {7-9}
// .vuepress/config.ts
import { defineHopeConfig } from "vuepress-theme-hope";

export default defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        footnote: true,
      },
    },
  },
});
```

:::

::: code-group-item JS

```js {7-9}
// .vuepress/config.js
const { defineHopeConfig } = require("vuepress-theme-hope");

module.exports = defineHopeConfig({
  themeConfig: {
    plugins: {
      mdEnhance: {
        footnote: true,
      },
    },
  },
});
```

:::

::::

## 语法

- 在 Markdown 中使用 `[^锚点文字]` 来定义脚注。

- 在之后的任何位置使用 `[^锚点文字]: ...` 来描述脚注内容。

- 如果脚注包含多个段落，其后的段落应当保持双层缩进。

## 例子

脚注 1 链接[^first].

脚注 2 链接[^second].

行内的脚注^[Text of inline footnote] 定义.

重复的页脚定义[^second].

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。

```md
脚注 1 链接[^first].

脚注 2 链接[^second].

行内的脚注^[Text of inline footnote] 定义.

重复的页脚定义[^second].

[^first]: 脚注 **可以包含特殊标记**

    也可以由多个段落组成

[^second]: 脚注文字。
```
