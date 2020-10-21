---
icon: writefill
tags:
  - feature
  - markdown
---

# 标记

让你的 VuePress 站点中的 Markdown 文件支持标记。

## 配置

```js {4}
module.exports = {
  themeConfig: {
    mdEnhance: {
      mark: true,
    },
  },
};
```

## 语法

使用 `== ==` 进行标记。请注意两边需要有空格。

## 案例

Mr.Hope ==十分== 帅

```md
Mr.Hope ==十分== 帅
```
