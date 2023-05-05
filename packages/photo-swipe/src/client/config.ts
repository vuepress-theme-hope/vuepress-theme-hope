import { defineClientConfig } from "@vuepress/client";

import { setupPhotoSwipe } from "./composables/index.js";
import { injectPhotoSwipeConfig } from "./helpers/index.js";

export default defineClientConfig({
  enhance: ({ app }) => {
    injectPhotoSwipeConfig(app);
  },
  setup: () => {
    setupPhotoSwipe();
  },
});
