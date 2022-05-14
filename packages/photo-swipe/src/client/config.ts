import { defineClientConfig } from "@vuepress/client";
import { setupPhotoSwipe } from "./composables";

export default defineClientConfig({
  setup: () => {
    setupPhotoSwipe();
  },
});
