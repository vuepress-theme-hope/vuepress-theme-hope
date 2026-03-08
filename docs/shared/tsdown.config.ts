import { tsdownConfig } from "../../scripts/tsdown.js";

export default tsdownConfig(
  [
    "index",
    "client",
    "components/HopeLogo",
    "components/HopeNotFoundHint",
    "components/ProjectLink",
    "components/SocialLink",
  ],
  { copy: [["styles/**/*.{css,scss}", "styles"]], publint: false },
);
