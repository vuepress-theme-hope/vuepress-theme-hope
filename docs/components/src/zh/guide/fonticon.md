---
title: FontIcon
---

此组件用于展示字体图标。

你可以在 Markdown 文件中使用它来添加图标。

<!-- more -->

## 示例

- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />

```md
- 主页图标: <FontIcon icon="home" />

- 一个大红 Markdown 图标: <FontIcon icon="markdown" color="red" size="32" />
```

## 属性

### icon

- 类型: `string`
- 必填: 是

Icon name

### color

- 类型: `string`
- 默认值: `'inherit'`

图标颜色

### size

- 类型: `string | number`
- 默认值: `当前字体大小`

图标大小。

## 全局设置

你可以通过 `componentsOptions.fontIcon.assets` 和 `componentsOptions.fontIcon.prefix` 全局设置图标资源 url 和图标前缀。

除了支持 URL 链接外，`componentsOptions.fontIcon.assets` 还支持 `'iconfont'` 和 `'fontawesome'` 关键字。
