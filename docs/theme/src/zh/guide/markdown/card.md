---
title: 卡片
icon: square
category:
  - Markdown
tag:
  - Markdown
  - 对齐
---

你可以在 Markdown 中添加卡片。

<!-- more -->

## 配置

::: code-tabs#language

@tab TS

```ts {8-10}
// .vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        card: true,
      },
    },
  }),
});
```

@tab JS

```js {7-9}
// .vuepress/config.js
import { hopeTheme } from "vuepress-theme-hope";

export default {
  theme: hopeTheme({
    plugins: {
      mdEnhance: {
        card: true,
      },
    },
  }),
};
```

:::

## 使用

你可以使用卡片代码块来在 Markdown 中添加卡片。YAML 和 JSON 的卡片数据格式均受支持:

````md
```card
# 卡片数据
```

```card
{
  // 卡片数据
}
```
````

卡片数据支持 `title`、`desc`、`logo`、`link` 和 `color` 属性。

如果你想要将多个卡片放在一起，你可以将它们包裹在 `card` 容器中：

````md
::: card

```card
# 卡片数据
```

```card
# 卡片数据
```

...

:::
````

## 案例

::: card

```card
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
color: rgba(253, 230, 138, 0.15)
```

```card
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "color": "rgba(253, 230, 138, 0.15)"
}
```

:::

````md
```card
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
color: rgba(253, 230, 138, 0.15)
```

```card
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "color": "rgba(253, 230, 138, 0.15)"
}
```
````
