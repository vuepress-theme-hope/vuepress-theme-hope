---
title: 组件
icon: puzzle-piece
---

你可以在 Markdown 中轻松添加组件。

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
      // 开启组件支持
      component: true,
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
      // 开启组件支持
      component: true,
    }),
  ],
};
```

:::

<!-- #region after -->

## 使用

你可以使用 component 代码块来在 Markdown 中添加组件。YAML 和 JSON 的数据格式均受支持:

````md
```component 组件名称
# 组件数据
```

```component 组件名称
{
  // 组件数据
}
```
````

## 案例

::: md-demo 快速使用 VPCard 组件

这里的 `<VPCard>` 是已经全局注册的卡片组件。

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
color: rgba(253, 230, 138, 0.15)
```

```component VPCard
{
  "title": "Mr.Hope",
  "desc": "Where there is light, there is hope",
  "logo": "https://mister-hope.com/logo.svg",
  "link": "https://mister-hope.com",
  "color": "rgba(253, 230, 138, 0.15)"
}
```

:::

<!-- #endregion after -->
