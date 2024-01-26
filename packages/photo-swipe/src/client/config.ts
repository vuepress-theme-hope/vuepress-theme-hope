import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import { setupPhotoSwipe } from "./composables/index.js";
import { injectPhotoSwipeConfig } from "./helpers/index.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  enhance: ({ app }) => {
    injectPhotoSwipeConfig(app);
  },
  setup: () => {
    setupPhotoSwipe();
  },
});
