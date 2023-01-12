---
title: ArtPlayer
---

Embed [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) in Markdown files.

<!-- more -->

:::tip
`ArtPlayer` components Only provides the ability to quickly insert the [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) player, please read the [document](https://artplayer.org/document/) carefully before using the global configuration and advanced usage.
:::

## Demo

A video player:

<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />

```md
<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />
```

A video player with poster:

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

- Type: `Omit<ArtPlayerOptions, "container">`
- Required: No

All options of ArtPlayer except `container` can be passed in, see [document](https://artplayer.org/document/start/option.html) for details.

Special note: `customType` is special, see [CustomType](#customtype) for details.

### url

- Type: `string`
- Required: No

`src.url` shortcut configuration item, and `src.url` will be overwritten when configured at the same time.

:::warning
`url` and `src.url` cannot be unconfigured at the same time.
:::

### poster

- Type: `string`
- Required: No

`src.poster` shortcut configuration item, and `src.poster` will be overwritten when configured at the same time.

### title

- Type: `string`
- Required: No

`src.title` shortcut configuration item, and `src.title` will be overwritten when configured at the same time.

### muted

- Type: `boolean`
- Required: No
- Default: `undefined`

`src.title` shortcut configuration item, and `src.title` will be overwritten when configured at the same time.

### player

- Type: `(player: ArtPlayer) => void`
- Required: No

This item will return an ArtPlayer instance, which can be used to register player-related events, etc. For an example, see [DanMu](#danmu).

### pluginDanmuKu

- Type: `ArtPlayerPluginDanmukuOption`
- Required: No

`artplayer-plugin-danmuku` All options can be passed in, see [document](https://artplayer.org/document/plugin/danmuku.html) for details.

For an example, see [DanMu](#danmu).

### width

- Type: `string | number`
- Required: No
- Default: `"100%"`

Video component width.

### ratio

Video component ratio

- Type: `string | number`
- Required: No
- Default: `16/9`

## GlobalConfiguration

:::tip
The global configuration will be passed into the component as the default configuration. When the component properties contain the same configuration item, the global configuration will be overwritten by deep merging.
:::

`componentsOptions.artPlayer`

```ts
{
  components: [
    "ArtPlayer",
  ],
  componentOptions: {
    artPlayer:{
        // config
    }
  }
}
```

### src

- Type: `Omit<ArtPlayerOptions, "container" | "url">`
- Required: No

All options of ArtPlayer except `container` and `url` can be passed in, see [document](https://artplayer.org/document/start/option.html) for details.

demo:

```ts
artPlayer: {
  src: {
    muted: true,
    autoplay: true
  }
}
```

### pluginDanmuKu

`artplayer-plugin-danmuku` configuration item

- Type: `ArtPlayerPluginDanmukuOption`
- Required: No

`artplayer-plugin-danmuku` All options can be passed in, see [document](https://artplayer.org/document/plugin/danmuku.html) for details.

### width

Video component default width

- Type: `string | number`
- Required: No
- Default: `"100%"`

### ratio

Video component default ratio

- Type: `string | number`
- Required: No
- Default: `16/9`

## MSE

The full name of MSE is Media Source Extensions, see [Media Source Extensions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API) for details.

Component built-in [hls.js](https://github.com/video-dev/hls.js), [mpegts.js](https://github.com/xqq/mpegts.js), [dash.js](https://github.com/Dash-Industry-Forum/dash.js).

### HLS

<ArtPlayer url="https://mse-demo.u2sb.com/dash/master.m3u8" />

```md
<ArtPlayer url="https://mse-demo.u2sb.com/dash/master.m3u8" />

or

<ArtPlayer
  :src="{url:'https://mse-demo.u2sb.com/dash/master.m3u8', type:'hls'}"
/>
```

:::tip

The component can automatically recognize the connection ending with `.m3u8` as hls format, and manually configure `src.type` in other cases.

:::

### FLV

<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

```md
<ArtPlayer url="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

or

<ArtPlayer
  :src="{url:'https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv', type:'flv'}"
/>
```

:::tip

The component can automatically recognize the connection at the end of `.flv` as hls format, and manually configure `src.type` in other cases.

:::

### DASH

<ArtPlayer url="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd" />

```md
<ArtPlayer
  url="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd"
/>

or

<ArtPlayer
  :src="{url:'https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd', type:'dash'}"
/>
```

:::tip

The component can automatically recognize the connection ending in `.mpd` as hls format, otherwise you need to manually configure `src.type`

:::

### CustomType

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

## DanMu

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
