---
icon: extension
category: feature
tags:
  - components
  - feature
---

# 新增组件

## 徽章 `<MyBadge />`

- **属性**:

  - `text` - string
  - `type` - string, 可选值: `"tip"|"warn"|"error"`，默认值是: `"tip"`
  - `color` - string, 可选
  - `vertical` - string, 可选值: `"top"|"middle"`，默认值是: `"top"`

- **使用**:

  你可以在标题中，使用这个组件来为标题或链接添加一些状态:

  ```md
  ### MyBadge <MyBadge text="Building" type="warn"/> <MyBadge text="MrHope" color="grey" />
  ```

## 返回顶部按钮 `<BackToTop />` <MyBadge text="支持页面配置" />

`vuepress-theme-hope` 添加了一个返回顶部控件，默认情况下将在下滑 300px 后显示。

该内容的配置项为 `backToTop`。
