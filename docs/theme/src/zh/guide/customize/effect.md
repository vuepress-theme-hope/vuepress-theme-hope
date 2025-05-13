---
title: 修改特效
icon: wand-magic-sparkles
order: 3
category:
  - 教程
  - 自定义
tag:
  - 自定义
---

此教程引导你如何自定义主题特效。

<!-- more -->

## 清除特效

主题在默认情况下，会:

- 使用色卡对分类、标签进行装饰
- 在切换页面、元素时添加动画
- 为主页元素添加缓入动画、以及为特性添加悬浮特效。
- 使用较为显眼的代码复制按钮
- 使用较为花哨的提示框。
- 在日间模式和夜间模式切换时添加渐入

如果你需要清除这些花哨的样式，请在主题选项中配置 `pure: true` 开启纯净模式。

同时，你可以通过控制调色板文件中的 `$color-transition` 和 `transform-transition` 来控制动画的时长:

```scss title=".vuepress/styles/palette.scss"
$color-transition: 0s;
$transform-transition: 0s;
```
