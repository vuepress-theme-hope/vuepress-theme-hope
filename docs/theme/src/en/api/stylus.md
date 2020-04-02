---
category: api
tags: 
 - api
 - style
---

# stylus configuration

`palette.styl` adds the following variables:

## $colorPicker

theme selector configuration, which needs to be the same as the selector configuration in the theme configuration.

Case:

```stylus
// .vuepress/styles/palette.styl
$colorPicker = {
  red: #f26d6d,
  blue: #2196f3,
  green: #3eaf7c,
  orange: #fb9b5f
}
```
