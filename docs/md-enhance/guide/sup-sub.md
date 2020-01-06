---
icon: superscript
---

# 上下角标

让你的 VuePress 站点中的 Markdown 文件支持流程图。

## 配置

```js
module.exports = {
  plugin: ['@mr-hope/md-enhance', {
    // 启用下角标功能
    sub: true,
    // 启用上角标
    sup: true
  }]
};
```

## 语法

- 使用`^ ^`进行上角标标注。
- 使用`~ ~`进行下角标标注。

## 案例

- 19^th^
- H~2~O

```md
- 19^th^
- H~2~O
```
