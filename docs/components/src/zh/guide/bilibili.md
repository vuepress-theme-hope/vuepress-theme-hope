---
title: BiliBili
---

在 Markdown 文件中嵌入 B 站视频。

## 属性

### bvid

- 类型: `string`
- 必填: 是

B 站视频 bvid。

### page

- 类型: `number`
- 默认值: `1`

视频分 P。

### width

- 类型: `string | number`
- 默认值: `100%`

B 站组件宽度。

### height

- 类型: `string | number`
- 必填：否

B 站组件高度

### radio

- 类型: `number`
- 默认值: `16 / 9`

B 站组件高度宽高比，只有当未指定 `height` 时有效。

### time

- 类型: `number`
- 默认值: `0`

视频开始时间 (单位: 秒)。

### danmaku

- 类型: `boolean`
- 默认值: `true`

是否启用弹幕

## 案例

一个 B 站视频:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

一个自定义分 P 和空降地址的 B 站视频:

<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />

```md
<BiliBili bvid="BV1kt411o7C3" :ratio="9/16" :time="60" :page="2" />
```

一个自定义设置的 B 站视频:

<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" :high-quality="false" :danmaku="false" />

```md
<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" :high-quality="false" :danmaku="false" />
```
