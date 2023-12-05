import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index"),
  ...rollupBundle(
    {
      base: "client",
      files: [
        "compact/components/Catalog",
        "components/ArtPlayer",
        "components/AudioPlayer",
        "components/Badge",
        "components/BiliBili",
        "components/BackToTop",
        "components/CodePen",
        "components/FontIcon",
        "components/Notice",
        "components/PDF",
        "components/Replit",
        "components/Share",
        "components/SiteInfo",
        "components/StackBlitz",
        "components/VPBanner",
        "components/VPCard",
        "components/VidStack",
        "components/VideoPlayer",
        "components/XiGua",
        "components/YouTube",
      ],
    },
    {
      external: [
        "@stackblitz/sdk",
        "artplayer",
        "create-codepen",
        "dashjs/dist/dash.all.min.js",
        "hls.js/dist/hls.min.js",
        "mpegts.js/dist/mpegts.js",
        "plyr",
        "qrcode",
        "vidstack/elements",
      ],
      copy: [
        ["client/styles", "client"],
        ["client/compact/styles", "client/compact"],
      ],
    },
  ),
];
