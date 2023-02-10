import { rollupTypescript } from "../../scripts/rollup.js";

export default [
  ...rollupTypescript("node/index", {
    external: ["vuepress-plugin-reading-time2", "vuepress-plugin-sass-palette"],
    copy: [["client/styles", "client"]],
  }),
  ...rollupTypescript("client/compact/components/Catalog", {
    copy: [["client/compact/styles", "client/compact"]],
  }),
  ...rollupTypescript("client/components/ArtPlayer", {
    external: [
      "artplayer",
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
    ],
  }),
  ...rollupTypescript("client/components/AudioPlayer", {
    external: [
      "plyr",
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
    ],
  }),
  ...rollupTypescript("client/components/Badge", {}),
  ...rollupTypescript("client/components/BiliBili", {
    external: [
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
    ],
  }),
  ...rollupTypescript("client/components/BackToTop", {}),

  ...rollupTypescript("client/components/CodePen", {}),
  ...rollupTypescript("client/components/FontIcon", {}),
  ...rollupTypescript("client/components/Notice", {}),
  ...rollupTypescript("client/components/PDF", {
    external: [
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
    ],
  }),
  ...rollupTypescript("client/components/SiteInfo", {}),
  ...rollupTypescript("client/components/StackBlitz", {
    external: ["@stackblitz/sdk"],
  }),
  ...rollupTypescript("client/components/VideoPlayer", {
    external: [
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
      "plyr",
    ],
  }),
  ...rollupTypescript("client/components/XiGua", {
    external: [
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
    ],
  }),
  ...rollupTypescript("client/components/YouTube", {
    external: [
      "dashjs/dist/dash.all.min.js",
      "hls.js/dist/hls.min.js",
      "mpegts.js/dist/mpegts.js",
    ],
  }),
  ...rollupTypescript("client/shared", {}),
  ...rollupTypescript("client/vueuse", {}),
];
