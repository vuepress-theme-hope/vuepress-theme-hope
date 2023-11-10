---
title: 卡片
icon: square
---

你可以在 Markdown 中添加卡片。

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
      // 开启卡片支持
      card: true,
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
      // 开启卡片支持
      card: true,
    }),
  ],
};
```

:::

<!-- #region after -->

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

:::: md-demo

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

::::

<!-- #endregion after -->
