# ArtPlayer

## Demo

A video player:

<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4" />

A video player with poster:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  title="ArtPlayer"
  poster="/poster.svg"
/>

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

HLS:

<ArtPlayer src="https://mse-demo.u2sb.com/dash/master.m3u8" />

FLV:

<ArtPlayer src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.flv" />

DASH:

<ArtPlayer src="https://mse-demo.u2sb.com/dash/caminandes_03_llamigos_720p.mpd" />

CustomType:

<ArtPlayer src="https://mse-demo.u2sb.com/dash/master.m3u8" :config="artPlayerConfig" />

With DanMuKu plugin:

<ArtPlayer
  src="https://mse-demo.u2sb.com/caminandes_03_llamigos_720p.mp4"
  :config="artPlayerDanmukuConfig"
  :customPlayer="customPlayer"
/>

<script setup>
import artplayerPluginDanmuku from "artplayer-plugin-danmuku";

const artPlayerConfig = {
  type: "customHLS",
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
