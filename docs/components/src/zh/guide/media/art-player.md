---
title: ArtPlayer
---

在 Markdown 文件中嵌入 [ArtPlayer](https://github.com/zhw2590582/ArtPlayer)。

使用本组件前，请先在你的项目中安装 `artplayer` 包:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D artplayer
```

@tab yarn

```bash
yarn add -D artplayer
```

@tab npm

```bash
npm i -D artplayer
```

:::

<!-- more -->

::: tip

`ArtPlayer` 组件提供快速插入 [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) 播放器的能力，如果你需要高级用法你应该阅读 [ArtPlayer 文档](https://artplayer.org/document/)。

:::

## 案例

<!-- #region demo -->

::: md-demo 一个视频播放器

<ArtPlayer src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />

:::

::: md-demo 一个包含了封面的播放器

<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>

:::

::: md-demo 一个包含自定义设置的播放器

<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
  airplay
  aspect-ratio
  auto-size
  auto-orientation
  auto-playback
  fast-forward
  flip
  fullscreen-web
  lock
  loop
  is-live
  muted
  mini-progress-bar
  pip
  screenshot
  subtitle-offset
/>

:::

<!-- #endregion demo -->

## 属性

### src

- 类型: `string`
- 必填: 是

视频源文件地址。

不支持相对路径。当填写路径名时，`base` 将自动添加到路径名的开头。

### type

- 类型: `string`
- 必填: 否

视频类型

### title

- 类型: `string`
- 必填: 否

视频标题

### poster

- 类型: `string`
- 必填: 否

视频封面

### width

- 类型: `string | number`
- 默认值: `"100%"`

播放器宽度

### height

- 类型: `string | number`
- 必填: 否

播放器高度

### ratio

- 类型: `string | number`
- 默认值: `16:9`

播放器比例

### 其他

ArtPlayer 组件还支持布尔属性。

你可以添加以下属性以启用相关功能:

- airplay
- autoplay
- aspect-ratio
- auto-mini
- auto-size
- auto-orientation
- auto-playback
- fast-forward
- flip
- fullscreen-web
- lock
- loop
- is-live
- muted
- mini-progress-bar
- pip
- screenshot
- subtitle-offset

你还可以添加以下属性来禁用相关功能：

- no-fullscreen
- no-hotkey
- no-playback-rate
- no-setting
- no-mutex
- no-plays-inline

### config

- 类型: `ArtPlayerOptions`

  ```ts
  import type { Option as ArtPlayerInitOptions } from "artplayer/types/option.js";

  type ArtPlayerOptions = Partial<
    Omit<
      ArtPlayerInitOptions,
      | "container"
      | "url"
      | "customType"
      | "plugins"
      | "contextmenu"
      | "controls"
      | "layers"
      | "settings"
    >
  >;
  ```

- 必填: 否

自定义 ArtPlayer。

有关详细信息，请参阅 [ArtPlayer 文档](https://artplayer.org/document/start/option.html)

### customPlayer

- 类型: `(player: ArtPlayer) => Artplayer | void | Promise<Artplayer> | Promise<void>`
- 必填: 否

该函数接收当前 ArtPlayer 实例作为参数，因此你可以通过它进行自定义。

## 全局配置

你可以通过插件选项中的 `componentOptions.artPlayer` 为所有 ArtPlayer 组件设置全局配置。

这是一个例子：

```ts
import { componentsPlugin } from "vuepress-plugin-components";

export default {
  plugins: [
    componentsPlugin({
      componentOptions: {
        artPlayer: {
          fastForward: true,
          screenshot: true,
        },
      },
    }),
  ],
};
```

## MSE

MSE 全称 Media Source Extensions， 详见 [Media Source Extensions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API)。

组件通过 [hls.js](https://github.com/video-dev/hls.js)、 [mpegts.js](https://github.com/xqq/mpegts.js)、 [dashjs](https://github.com/Dash-Industry-Forum/dash.js) 带来了了扩展的媒体支持。

在你的项目中安装上述依赖以支持下列格式:

::: code-tabs#shell

@tab pnpm

```bash
pnpm add -D dashjs hls.js mpegts.js
```

@tab yarn

```bash
yarn add -D dashjs hls.js mpegts.js
```

@tab npm

```bash
npm i -D dashjs hls.js mpegts.js
```

:::

::: md-demo HLS

<ArtPlayer src="https://mse-demo.u2sb.com/dash/master.m3u8" />

:::

::: md-demo FLV

<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

:::

::: md-demo DASH

<ArtPlayer src="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd" />

:::

::: tip

该组件可以自动识别具有 `m3u8`、`flv` 或 `mpd` 扩展名的链接。

在其他情况下，你应该手动将 `type` 设置为上述其中之一。

:::

## 高级用法

### 额外的格式支持

你可以通过 `config` 属性在 ArtPlayer 选项中使用 `customType` 选项支持其他格式的视频。

<ArtPlayer
  src="https://mse-demo.u2sb.com/dash/master.m3u8"
  type="customHLS"
  :config="artPlayerConfig"
/>

```html
<ArtPlayer
  src="https://mse-demo.u2sb.com/dash/master.m3u8"
  type="customHLS"
  :config="artPlayerConfig"
/>

<script setup>
  const artPlayerConfig = {
    customType: {
      customHLS: async (mediaElement, src, player) => {
        if (
          mediaElement.canPlayType("application/x-mpegURL") ||
          mediaElement.canPlayType("application/vnd.apple.mpegURL")
        ) {
          mediaElement.src = src;
        } else {
          const HLS = (await import("hls.js/dist/hls.min.js")).default;
          const hls = new HLS();

          hls.attachMedia(mediaElement);
          hls.on(HLS.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(src);
          });
          player.on("destroy", () => {
            hls.destroy();
          });
        }
      },
    },
  };
</script>
```

### 添加插件

这是一个添加弹幕库插件的演示:

<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
  :config="artPlayerDanmukuConfig"
  :customPlayer="customPlayer"
/>

```html
<ArtPlayer
  src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4"
  :config="artPlayerDanmukuConfig"
  :customPlayer="customPlayer"
/>

<script setup>
  import artplayerPluginDanmuku from "artplayer-plugin-danmuku";

  const DANMAKU_API = "https://danmu.u2sb.com/api/artplayer/v1";
  const DANMAKU_ID = "jsdKLNMks21NMij";
  const BILIBILI_DANMAKU = `${DANMAKU_API}/bilibili/BV1cs411Q7Ng/3.json`;

  const danmukuOptions = {
    danmuku: () =>
      Promise.allSettled([
        fetch(BILIBILI_DANMAKU).then((res) => res.json()),
        fetch(`${DANMAKU_API}/${DANMAKU_ID}.json`).then((res) => res.json()),
      ])
        .then((res) =>
          res.filter((r) => r.status === "fulfilled").map((r) => r.value),
        )
        .then((res) =>
          res
            .filter(
              (r) =>
                r["code"] !== undefined &&
                r["code"] === 0 &&
                r["data"] !== undefined &&
                r["data"].length > 0,
            )
            .reduce((acc, cur) => acc.concat(cur["data"]), []),
        ),
  };

  const artPlayerDanmukuConfig = {
    plugins: [artplayerPluginDanmuku(danmukuOptions)],
  };

  const customPlayer = (player) => {
    player.on("artplayerPluginDanmuku:emit", (danmuku) => {
      fetch(DANMAKU_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Id: DANMAKU_ID,
          Referrer: window.location.origin + window.location.pathname,
          ...danmuku,
        }),
      });
    });
  };
</script>
```

<script setup>
import artplayerPluginDanmuku from "artplayer-plugin-danmuku";

const artPlayerConfig = {
  customType: {
    customHLS: async (mediaElement, src, player) => {
      if (
        mediaElement.canPlayType("application/x-mpegURL") ||
        mediaElement.canPlayType("application/vnd.apple.mpegURL")
      ) {
        mediaElement.src = src;
      } else {
        const HLS = (await import("hls.js/dist/hls.min.js")).default;
        const hls = new HLS();

        hls.attachMedia(mediaElement);
        hls.on(HLS.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(src);
        });
        player.on("destroy", () => {
          hls.destroy();
        });
      }
    },
  },
};

const DANMAKU_API = "https://danmu.u2sb.com/api/artplayer/v1";
const DANMAKU_ID = "jsdKLNMks21NMij";
const BILIBILI_DANMAKU = `${DANMAKU_API}/bilibili/BV1cs411Q7Ng/3.json`;

const danmukuOptions = {
  danmuku: () =>
    Promise.allSettled([
      fetch(BILIBILI_DANMAKU).then((res) => res.json()),
      fetch(`${DANMAKU_API}/${DANMAKU_ID}.json`).then((res) => res.json()),
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

const artPlayerDanmukuConfig = {
  plugins: [artplayerPluginDanmuku(danmukuOptions)],
};

const customPlayer = (player) => {
  player.on("artplayerPluginDanmuku:emit", (danmuku) => {
    fetch(DANMAKU_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        Id: DANMAKU_ID,
        Referrer: window.location.origin + window.location.pathname,
        ...danmuku,
      }),
    });
  });
};
</script>
