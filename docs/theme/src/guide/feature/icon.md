---
icon: emoji
tag:
  - icon
  - style
category: style
---

# 图标支持

整个主题在多处都添加了 FontClass 格式图标的支持。

请在 `.vuepress/styles` 的 `index.styl` 中导入对应的图标css文件。例如：

```css
@import '//at.alicdn.com/t/font_1446717_giwlq66d28j.css'
```

图标的前置名默认为 `icon-`，可以在主题配置[^themeConfig]中的 `iconPrefix` 字段进行更改。
