---
title: 脚注
icon: footnote
---

让你的 VuePress 站点中的 Markdown 文件支持脚注。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8}
// .vuepress/config.ts
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用脚注
      footnote: true,
    }),
  ],
};
```

@tab JS

```js {8}
// .vuepress/config.js
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";

export default {
  plugins: [
    mdEnhancePlugin({
      // 启用脚注
      footnote: true,
    }),
  ],
};
```

:::

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
