---
icon: api
---

# API

## 全部启用

你可以直接传递 `true` 来启用全部功能。

```js {2}
module.exports = {
  plugin: ['md-enhance', true]
};
```

## lineNumbers

- 类型: `boolean`
- 默认值: `true`

是否在每个代码块的左侧显示行号。

## sup

- 类型: `boolean`
- 默认值: `false`

是否启用上角标格式支持。

## sub

- 类型: `boolean`
- 默认值: `false`

是否启用下角标格式支持。

## footnote

- 类型: `boolean`
- 默认值: `false`

是否启用脚注格式支持。

## tex

- 类型: `boolean`
- 默认值: `false`

是否启用 $\TeX$ 语法支持。

## flowchart

- 类型: `boolean`
- 默认值: `false`

是否启用 流程图 语法支持。
