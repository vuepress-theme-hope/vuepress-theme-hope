import { defineClientConfig } from "@vuepress/client";
import { setupPhotoSwipe } from "./composables/index.js";

export default defineClientConfig({
  setup: () => {
    setupPhotoSwipe();
  },
});
