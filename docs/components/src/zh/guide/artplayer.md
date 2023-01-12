---
title: ArtPlayer
---

在 Markdown 文件中嵌入 [ArtPlayer](https://github.com/zhw2590582/ArtPlayer)。

<!-- more -->

::: tip

`ArtPlayer` 组件仅提供快速插入 [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) 播放器的能力，使用全局配置和高级用法前请详细阅读[文档](https://artplayer.org/document/)。

:::

## 案例

一个视频播放器:

<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />

```md
<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />
```

一个包含了封面的播放器:

<ArtPlayer
  url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>

```md
<ArtPlayer
  url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>
```

## Props

### src

ArtPlayer 配置项

- 类型: `Omit<ArtPlayerOptions, "container">`
- 必填: 否

ArtPlayer 除 `container` 外的所有选项均可传入，详见 [相关文档](https://artplayer.org/document/start/option.html)。

特殊说明: `customType` 比较特别，详见 [自定义类型](#自定义类型)。

### url

- 类型: `string`
- 必填: 否

`src.url` 快捷配置项，同时配置时会覆盖 `src.url`

::: warning

`url` 和 `src.url` 不能同时不做配置。

:::

### poster

- 类型: `string`
- 必填: 否

`src.poster` 快捷配置项，同时配置时会覆盖 `src.poster`

### title

- 类型: `string`
- 必填: 否

`src.title` 快捷配置项，同时配置时会覆盖 `src.title`

### muted

- 类型: `boolean`
- 必填: 否
- 默认值: `undefined`

`src.muted` 快捷配置项，同时配置时会覆盖 `src.muted`

### player

- 类型: `(player: ArtPlayer) => void`
- 必填: 否

该项会返回 ArtPlayer 实例，可用于注册播放器相关事件等，示例见[弹幕](#弹幕)。

### pluginDanmuKu

- 类型: `ArtPlayerPluginDanmukuOption`
- 必填: 否

`artplayer-plugin-danmuku` 所有选项均可传入，详见[相关文档](https://artplayer.org/document/plugin/danmuku.html)。

示例见[弹幕](#弹幕)。

### width

播放器宽度

- 类型: `string | number`
- 必填: 否
- 默认值: `"100%"`

### ratio

播放器比例

- 类型: `string | number`
- 必填: 否
- 默认值: `16/9`

## 全局配置

::: tip

全局配置会作为默认配置传入组件，当组件属性含有相同配置项时，会通过深度合并覆盖全局配置。

:::

`componentsOptions.artPlayer`

```ts
{
  components: [
    "ArtPlayer", // 启用组件
  ],
  componentOptions: {
    artPlayer:{
        // 相关配置
    }
  }
}
```

### src

ArtPlayer 配置项

- 类型: `Omit<ArtPlayerOptions, "container" | "url">`
- 必填: 否

ArtPlayer 除 `container` 和 `url` 外的所有选项均可传入，详见 [相关文档](https://artplayer.org/document/start/option.html)。

示例:

```ts
artPlayer: {
  src: {
    muted: true,
    autoplay: true
  }
}
```

### pluginDanmuKu

弹幕插件配置项

- 类型: `ArtPlayerPluginDanmukuOption`
- 必填: 否
- 默认值: `undefined`

`artplayer-plugin-danmuku` 所有选项均可传入，详见 [相关文档](https://artplayer.org/document/plugin/danmuku.html)。

### width

播放器默认宽度

- 类型: `string | number`
- 必填: 否
- 默认值: `"100%"`

### ratio

播放器默认比例，除非有大量相同比例的时候，否则不建议全局配置。

- 类型: `string | number`
- 必填: 否
- 默认值: `16/9`

## MSE

MSE 全称 Media Source Extensions， 详见 [Media Source Extensions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API)。

组件内置 [hls.js](https://github.com/video-dev/hls.js)、 [mpegts.js](https://github.com/xqq/mpegts.js)、 [dash.js](https://github.com/Dash-Industry-Forum/dash.js) 支持。

### HLS

<ArtPlayer url="https://mse-demo.u2sb.com/dash/master.m3u8" />

```md
<ArtPlayer url="https://mse-demo.u2sb.com/dash/master.m3u8" />

或
<ArtPlayer
  :src="{url:'https://mse-demo.u2sb.com/dash/master.m3u8', type:'hls'}"
/>
```

::: tip

组件可以将 `.m3u8` 结尾的连接自动识别为 hls 格式，其他情况均需手动配置 `src.type`

:::

### FLV

<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

```md
<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

或
<ArtPlayer
  :src="{url:'https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv', type:'flv'}"
/>
```

::: tip

组件可以将 `.flv` 结尾的连接自动识别为 hls 格式，其他情况均需手动配置 `src.type`

:::

### DASH

<ArtPlayer url="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd" />

```md
<ArtPlayer
  url="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd"
/>

或

<ArtPlayer
  :src="{ url: 'https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd', type: 'dash' }"
/>
```

::: tip

组件可以将 `.mpd` 结尾的连接自动识别为 hls 格式，其他情况均需手动配置 `src.type`

:::

### 自定义类型

<ArtPlayer :src="artCustomType" />

```bash
pnpm add -D hls.js
```

```md
<ArtPlayer :src="artCustomType" />

<script setup>
  const artCustomType = {
    url: "https://mse-demo.u2sb.com/dash/master.m3u8",
    type: "customHLS",
    customType: {
      customHLS: async (mediaElement, src, player) => {
        if (
          mediaElement.canPlayType("application/x-mpegURL") ||
          mediaElement.canPlayType("application/vnd.apple.mpegURL")
        ) {
          mediaElement.src = src;
        } else {
          const { default: Hls } = await import("hls.js/dist/hls.min.js");
          const hls = new Hls();
          hls.attachMedia(mediaElement);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(src);
          });
          player.on("destroy", function () {
            hls.destroy();
          });
        }
      },
    },
  };
</script>
```

## 弹幕

<ArtPlayer
  :src="artDanmu"
  :player="playerDanmu"
  :pluginDanmuKu="danmu"
/>

```md
<ArtPlayer
  :src="artDanmu"
  :player="playerDanmu"
  :pluginDanmuKu="danmu"
/>

<script setup>
  const danmakuId = "jsdKLNMks21NMij";
  const danmakuApi = "https://danmu.u2sb.com/api/artplayer/v1";
  const bilibiliDanmaku = `${danmakuApi}/bilibili/BV1cs411Q7Ng/3.json`;

  const artDanmu = {
    url: "https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4",
    type: "mp4",
  };
  const danmu = {
    danmuku: () =>
      Promise.allSettled([
        fetch(bilibiliDanmaku).then((res) => res.json()),
        fetch(`${danmakuApi}/${danmakuId}.json`).then((res) => res.json()),
      ])
        .then((res) =>
          res.filter((r) => r.status === "fulfilled").map((r) => r.value)
        )
        .then((res) =>
          res
            .filter(
              (r) =>
                r["code"] !== undefined &&
                r["code"] === 0 &&
                r["data"] !== undefined &&
                r["data"].length > 0
            )
            .reduce((acc, cur) => acc.concat(cur["data"]), [])
        ),
  };
  const playerDanmu = (player) => {
    player.on("artplayerPluginDanmuku:emit", (danmu) => {
      console.log(danmu);
      fetch(danmakuApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: danmakuId,
          Referer: window.location.origin + window.location.pathname,
          ...danmu,
        }),
      });
    });
  };
</script>
```

<script setup>
  const artCustomType = {
    url: "https://mse-demo.u2sb.com/dash/master.m3u8",
    type: "customHLS",
    customType: {
      customHLS: async (mediaElement, src, player) => {
        if (
          mediaElement.canPlayType("application/x-mpegURL") ||
          mediaElement.canPlayType("application/vnd.apple.mpegURL")
        ) {
          mediaElement.src = src;
        } else {
          const { default: Hls } = await import("hls.js/dist/hls.min.js");
          const hls = new Hls();
          hls.attachMedia(mediaElement);
          hls.on(Hls.Events.MEDIA_ATTACHED, function () {
            hls.loadSource(src);
          });
          player.on("destroy", function () {
            hls.destroy();
          });
        }
      },
    },
  };

  const danmakuId = "jsdKLNMks21NMij";
  const danmakuApi = "https://danmu.u2sb.com/api/artplayer/v1";
  const bilibiliDanmaku = `${danmakuApi}/bilibili/BV1cs411Q7Ng/3.json`;

  const artDanmu = {
    url: "https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4",
    type: "mp4"
  };
  const danmu = {
    danmuku: () =>
      Promise.allSettled([
        fetch(bilibiliDanmaku).then((res) => res.json()),
        fetch(`${danmakuApi}/${danmakuId}.json`).then((res) => res.json()),
      ])
        .then((res) =>
          res.filter((r) => r.status === "fulfilled").map((r) => r.value)
        )
        .then((res) =>
          res
            .filter(
              (r) =>
                r["code"] !== undefined &&
                r["code"] === 0 &&
                r["data"] !== undefined &&
                r["data"].length > 0
            )
            .reduce((acc, cur) => acc.concat(cur["data"]), [])
        ),
  };
  const playerDanmu = (player) => {
    player.on("artplayerPluginDanmuku:emit", (danmu) => {
      console.log(danmu);
      fetch(danmakuApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: danmakuId,
          Referer: window.location.origin + window.location.pathname,
          ...danmu,
        }),
      });
    });
  };
</script>
