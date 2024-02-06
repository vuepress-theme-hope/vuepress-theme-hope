import { useLocaleConfig } from "@vuepress/helper/client";
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { usePageData } from "vuepress/client";

import { delay, imageSelector, locales } from "../define.js";
import { usePhotoSwipeOptions } from "../helpers/index.js";
import { getImages, registerPhotoSwipe } from "../utils/index.js";

import "photoswipe/dist/photoswipe.css";
import "../styles/photo-swipe.scss";

export const setupPhotoSwipe = (): void => {
  const photoSwipeOptions = usePhotoSwipeOptions();
  const locale = useLocaleConfig(locales);
  const page = usePageData();

  let destroy: (() => void) | null = null;

  const photoSwipeWrapper = (): Promise<void> =>
    new Promise<void>((resolve) => setTimeout(resolve, delay))
      .then(() => nextTick())
      .then(() => getImages(imageSelector))
      .then(async (images) => {
        destroy = await registerPhotoSwipe(images, {
          ...photoSwipeOptions,
          ...locale.value,
        });
      });

  onMounted(() => {
    void photoSwipeWrapper();

    watch(
      () => page.value.path,
      () => {
        destroy?.();
        void photoSwipeWrapper();
      },
    );
  });

  onUnmounted(() => {
    destroy?.();
  });
};
