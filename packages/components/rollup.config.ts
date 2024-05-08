import { rollupBundle } from "../../scripts/rollup.js";

export default [
  ...rollupBundle("node/index"),
  ...rollupBundle(
    {
      base: "client",
      files: [
        "components/ArtPlayer",
        "components/AudioPlayer",
        "components/Badge",
        "components/BiliBili",
        "components/CodePen",
        "components/FontIcon",
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
        "index",
      ],
    },
    {
      external: [
        "@stackblitz/sdk",
        "artplayer",
        "create-codepen",
        "dashjs",
        "hls.js/dist/hls.min.js",
        "mpegts.js/dist/mpegts.js",
        "qrcode",
        "vidstack/global/player",
      ],
      copy: [["client/styles", "client"]],
    },
  ),
];
