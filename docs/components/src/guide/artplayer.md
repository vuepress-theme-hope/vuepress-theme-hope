---
title: ArtPlayer
---

Embed [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) in Markdown files.

<!-- more -->

::: tip

`ArtPlayer` components provides the ability to quickly insert the [ArtPlayer](https://github.com/zhw2590582/ArtPlayer) player. You should read [ArtPlayer Docs](https://artplayer.org/document/) if you want advanced usage.

:::

## Demo

A video player:

<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />

```md
<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />
```

A video player with poster:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>

```md
<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  poster="/poster.svg"
/>
```

A video player with custom settings:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
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

```md
<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
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
```

## Props

### src

- Type: `string`
- Required: Yes

Video source link.

### type

- Type: `string`
- Required: No

Video type

### title

- Type: `string`
- Required: No

Video title

### poster

- Type: `string`
- Required: No

Video poster

### width

- Type: `string | number`
- Default: `"100%"`

Video component width.

### height

- Type: `string | number`
- Required: No

Video component height

### ratio

- Type: `string | number`
- Default: `16:9`

Video component ratio

### others

ArtPlayer components also support boolean attrs.

You can add the following attrs to enable related feature:

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

And you can also add the following attrs to disable related feature:

- no-fullscreen
- no-hotkey
- no-playback-rate
- no-setting
- no-mutex
- no-plays-inline

### config

- Type: `ArtPlayerOptions`

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

- Required: No

Customize ArtPlayer.

For details, see [ArtPlayer Docs](https://artplayer.org/document/start/option.html)

### customPlayer

- Type: `(player: ArtPlayer) => Artplayer | void | Promise<Artplayer> | Promise<void>`
- Required: No

The function receives current ArtPlayer instance as argument, so you can customize through it.

## Global Config

You can set global config for all `ArtPlayer` components via `componentOptions.artPlayer` in plugin options.

Here is an example:

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

And you can still override them in component.

## MSE

The full name of MSE is Media Source Extensions, see [Media Source Extensions API](https://developer.mozilla.org/zh-CN/docs/Web/API/Media_Source_Extensions_API) for details.

Component has extended media support via [hls.js](https://github.com/video-dev/hls.js), [mpegts.js](https://github.com/xqq/mpegts.js) and [dash.js](https://github.com/Dash-Industry-Forum/dash.js).

- HLS

  <ArtPlayer src="https://mse-demo.u2sb.com/dash/master.m3u8" />

  ```md
  <ArtPlayer src="https://mse-demo.u2sb.com/dash/master.m3u8" />
  ```

- FLV

  <ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

  ```md
  <ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />
  ```

- DASH

  <ArtPlayer src="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd" />

  ```md
  <ArtPlayer src="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd" />
  ```

::: tip

The component can automatically recognize links having `m3u8`, `flv` or `mpd` extension.

In other cases, you shall manually set `type` to one of them above.

:::

## Advanced Usage

### Extra Format Support

You can support other format videos with `customType` option in ArtPlayer options via `config` prop.

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

### Adding Plugins

Here is a demo adding DanMuKu plugin:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  :config="artPlayerDanmukuConfig"
  :customPlayer="customPlayer"
/>

```html
<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
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
