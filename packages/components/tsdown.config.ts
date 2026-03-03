import { tsdownConfig } from "../../scripts/tsdown.js";

export default tsdownConfig(
  [
    "node/index",
    "client/components/ArtPlayer",
    "client/components/AudioPlayer",
    "client/components/Badge",
    "client/components/BiliBili",
    "client/components/CodePen",
    "client/components/PDF",
    "client/components/Share",
    "client/components/SiteInfo",
    "client/components/StackBlitz",
    "client/components/VPBanner",
    "client/components/VPCard",
    "client/components/VidStack",
    "client/components/VideoPlayer",
    "client/components/YouTube",
    "client/index",
  ],
  { copy: [["client/styles/"]] },
);
