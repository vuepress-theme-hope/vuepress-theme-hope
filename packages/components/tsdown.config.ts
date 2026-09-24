import { tsdownConfig } from "../../scripts/tsdown.js";

export default tsdownConfig(
  [
    "node/index",
    "client/components/Badge",
    "client/components/CodePen",
    "client/components/Share",
    "client/components/SiteInfo",
    "client/components/StackBlitz",
    "client/components/VPBanner",
    "client/components/VPCard",
    "client/index",
  ],
  { copy: [["client/styles"]] },
);
