---
title: BiliBili
---

在 Markdown 文件中嵌入 B 站视频。

<!-- more -->

## 案例

一个 B 站视频:

<BiliBili bvid="BV1kt411o7C3" />

```md
<BiliBili bvid="BV1kt411o7C3" />
```

一个自定义空降地址的 B 站视频:

<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" page="2" />

```md
<BiliBili aid="34304064" cid="109293122" ratio="9:16" time="60" page="2" />
```

## 属性

### bvid

- 类型: `string`
- 必填: 是

B 站视频 bvid。

### title

- 类型: `string`
- 必填: 否

B 站视频标题

### page

- 类型: `number`
- 默认值: `1`

视频分 P。

::: info

设置视频分 P 时，必须提供 `aid` 和 `cid`，并且可以忽略 `bvid` 属性。

:::

### width

- 类型: `string | number`
- 默认值: `100%`

B 站组件宽度。

### height

- 类型: `string | number`
- 必填：否

B 站组件高度

### ratio

- 类型: `number`
- 默认值: `16 / 9`

B 站组件高度宽高比，只有当未指定 `height` 时有效。

### time

- 类型: `number`
- 默认值: `0`

视频开始时间 (单位: 秒)。

### autoplay

- 类型: `boolean`
- 默认值: `false`

视频自动播放
