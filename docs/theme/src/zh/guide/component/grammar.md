---
title: Component
icon: puzzle-piece
order: 3
category:
  - 组件
tag:
  - 组件
  - Markdown
---

你可以在 Markdown 中通过 component 代码块快速添加组件。

<!-- more -->

## 配置

```ts twoslash {5} title=".vuepress/theme.ts"
import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";

export default hopeTheme({
  markdown: {
    component: true,

    // 其他选项...
  },
});
```

## 使用

你可以使用 component 代码块来在 Markdown 中添加组件。YAML 和 JSON 的数据格式均受支持:

- YAML <Badge text="推荐" type="tip" />:

  ````md
  ```component 组件名称
  # 组件数据
  ```
  ````

- JSON:

  ````md
  ```component 组件名称
  {
    // 组件数据
  }
  ```
  ````

## 案例

::: md-demo 快速使用 VPCard 组件

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

这里的 `<VPCard>` 是已经全局注册的卡片组件。

上方的代码块和下方等价:

```md
<VPCard
  title="Mr.Hope"
  desc="Where there is light, there is hope"
  logo="https://mister-hope.com/logo.svg"
  link="https://mister-hope.com"
  background="rgba(253, 230, 138, 0.15)"
/>
```
