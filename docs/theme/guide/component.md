---
icon: extension
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
