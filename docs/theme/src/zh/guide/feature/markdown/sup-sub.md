---
icon: superscript
category: markdown
tags:
  - feature
  - markdown
---

# 上下角标

让你的 VuePress 站点中的 Markdown 文件支持上下角标。

## 配置

```js {5,7}
module.exports = {
  themeConfig: {
    mdEnhance: {
      // 启用下角标功能
      sub: true,
      // 启用上角标
      sup: true,
    },
  },
};
```

## 语法

- 使用`^ ^`进行上角标标注。
- 使用`~ ~`进行下角标标注。

::: details 例子

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```

:::
