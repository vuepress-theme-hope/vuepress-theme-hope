import { defineClientConfig } from "vuepress/client";

import LightGallery from "./components/LightGallery.js";
import { injectLightGalleryConfig } from "./helpers/index.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default defineClientConfig({
  enhance: ({ app }) => {
    injectLightGalleryConfig(app);
  },
  rootComponents: [LightGallery],
});
