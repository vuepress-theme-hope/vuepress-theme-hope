---
title: 内容
icon: pen
dir:
  collapsible: false
  order: 2
index: false
---

<!-- #region intro -->

此插件提供以下方法来丰富您的内容。

- 卡片: 快速创建卡片
- 脚注: 对关键内容做补充说明
- 导入文件: 轻松拆分或复用文件
- 幻灯片: 展示内容

<!-- #endregion intro -->

<!-- more -->

## 案例

<!-- #region demo -->

### 组件

```component VPCard
title: Mr.Hope
desc: Where there is light, there is hope
logo: https://mister-hope.com/logo.svg
link: https://mister-hope.com
background: rgba(253, 230, 138, 0.15)
```

- [查看详情](./component.md)

### 脚注

此文字有脚注[^first].

[^first]: 这是脚注内容

- [查看详情](./footnote.md)

### 导入文件

<!-- @include: ./demo.snippet.md{9-13} -->

- [查看详情](./include.md)

### 幻灯片

@slidestart

## 幻灯片 1

一个有文字和 [链接](https://mister-hope.com) 的段落

---

## 幻灯片 2

- 项目 1
- 项目 2

---

## 幻灯片 3.1

```js
const a = 1;
```

--

## 幻灯片 3.2

$$
J(\theta_0,\theta_1) = \sum_{i=0}
$$

@slideend

- [查看详情](./revealjs/README.md)

### 选项卡

::: tabs#fruit

@tab apple

Apple

@tab banana

Banana

@tab orange

Orange

:::

- [查看详情](./tabs.md)

<!-- #endregion demo -->
