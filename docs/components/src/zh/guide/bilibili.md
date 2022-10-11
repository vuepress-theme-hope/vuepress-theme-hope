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

B 站 iframe 宽度。

### height

- Type: `string | number`
- Default: `0`

B 站 iframe 高度, 当值为 0 时 `autoHeight` 生效。

### autoHeight

- Type: `Array<number>`
- Default: `[9 / 16, 70]`

B 站 iframe 高度自动计算参数, `height = width * autoHeight[0] + autoHeight[1]`.

### mobileWidth

- Type: `number`
- Default: `520`

B 站 iframe 移动端播放器触发宽度, 必须与 `autoHeight` 同时使用. 当 iframe 宽度小于设定值时, 高度将会变为 `height = width * autoHeight[0]`

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

<BiliBili bvid="BV1Be4y1f7Es" />

```md
<BiliBili bvid="BV1Be4y1f7Es" />
```

一个自定义分 P 和空降地址的 B 站视频:

<BiliBili bvid="BV1Be4y1f7Es" :time="60" :page="2" />

```md
<BiliBili bvid="BV1Be4y1f7Es" :time="60" :page="2" />
```

一个自定义设置的 B 站视频:

<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" :high-quality="false" :danmaku="false" />

```md
<BiliBili bvid="BV1kt411o7C3" :auto-height="[9 / 16, 20]" :high-quality="false" :danmaku="false" />
```
