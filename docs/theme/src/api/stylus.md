---
tag: 
 - api
 - style
---

# stylus 配置

`palette.styl` 新增如下变量：

## $colorPicker

主题选择器配置，需要与主题配置中的选择器配置相同。

案例：

```stylus
// .vuepress/styles/palette.styl
$colorPicker = {
  red: #f26d6d,
  blue: #2196f3,
  green: #3eaf7c,
  orange: #fb9b5f
}
```
