---
title: 流程图
icon: tree
category: markdown
tags:
  - flowchart
  - markdown
---

让你的 VuePress 站点中的 Markdown 文件支持流程图。

本插件利用了 [flowchart.js](https://github.com/adrai/flowchart.js) 来支持这一功能。

<!-- more -->

## 配置

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      flowchart: true,
    },
  },
};
```

## 语法

````md
<!-- ↓ :preset 是可选的 -->

```flow:preset

<!-- 放置你的流程图代码 -->

```
````

目前可用的预设:

- `vue` (默认)
- `ant`

## 演示

```flow
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Do something|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```

````md
```flow
st=>start: Start|past:>http://www.google.com[blank]
e=>end: End|future:>http://www.google.com
op1=>operation: My Operation|past
op2=>operation: Do something|current
sub1=>subroutine: My Subroutine|invalid
cond=>condition: Yes
or No?|approved:>http://www.google.com
c2=>condition: Good idea|rejected
io=>inputoutput: catch something...|future

st->op1(right)->cond
cond(yes, right)->c2
cond(no)->sub1(left)->op1
c2(yes)->io->e
c2(no)->op2->e
```
````

## 流程图介绍

详见 [流程图介绍](https://vuepress-theme-hope.github.io/md-enhance/zh/guide/flowchart/#%E6%B5%81%E7%A8%8B%E5%9B%BE%E4%BB%8B%E7%BB%8D)。
