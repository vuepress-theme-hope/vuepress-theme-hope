---
title: 任务列表
icon: check
category: markdown
tags:
  - markdown
  - task list
---

让你的 VuePress 站点中的 Markdown 文件支持任务列表。

<!-- more -->

## 配置

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      tasklist: true,
    },
  },
};
```

## 语法

- 使用 `- [ ] 一些文字` 渲染一个未勾选的任务项
- 使用 `- [x] 一些文字` 渲染一个勾选了的任务项 (我们也支持大写的 `X`)

## 案例

- [ ] Plan A
- [x] Plan B

```md
- [ ] Plan A
- [x] Plan B
```
