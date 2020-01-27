---
icon: extension
category: new function
---

# 新增组件

## 徽章 `<MyBadge />`

- **Props**:

  - `text` - string
  - `type` - string, 可选值： `"tip"|"warn"|"error"`，默认值是： `"tip"`
  - `color` - string, 可选
  - `vertical` - string, 可选值： `"top"|"middle"`，默认值是： `"top"`

- **Usage**:

你可以在标题中，使用这个组件来为标题或链接添加一些状态：

``` md
### MyBadge <MyBadge text="Building" type="warn"/> <MyBadge text="MrHope" color="grey" />
```

## 返回顶部按钮 `<BackToTop />`

vuepress-theme-hope 添加了一个自制的返回顶部控件，默认情况下将在下滑 300px 后显示。

返回顶部按钮使用了一个圆形有色图标代替了默认主题中的箭头。

你可以在 `themeConfig` 将 `backToTop` 设置为 `false` 来禁用它。
