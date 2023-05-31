import { defineClientConfig } from "@vuepress/client";

import LightGallery from "./components/LightGallery.js";
import { injectLightGalleryConfig } from "./helpers/index.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    injectLightGalleryConfig(app);
  },
  rootComponents: [LightGallery],
});
