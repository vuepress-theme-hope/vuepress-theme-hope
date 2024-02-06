import { useEventListener } from "@vueuse/core";
import type PhotoSwipe from "photoswipe";
import type { SlideData } from "photoswipe";

import { LOADING_ICON } from "./icon.js";
import { getImageUrlInfo } from "./images.js";
import { initPhotoSwipe } from "./initPhotoswipe.js";
import { scrollToClose } from "../define.js";
import type { PhotoSwipeOptions } from "../helpers/index.js";

export interface PhotoSwipeState {
  open: (index: number) => void;
  close: () => void;
  destroy: () => void;
}

export const createPhotoSwipe = (
  images: string[],
  photoSwipeOptions: PhotoSwipeOptions,
): Promise<PhotoSwipeState> =>
  import(/* webpackChunkName: "photo-swipe" */ "photoswipe").then(
    ({ default: PhotoSwipe }) => {
      let currentPhotoSwipe: PhotoSwipe | null = null;

      const dataSource = images.map<SlideData>((image) => ({
        html: LOADING_ICON,
        msrc: image,
      }));

      images.forEach((image, index) => {
        void getImageUrlInfo(image).then((data) => {
          dataSource.splice(index, 1, data);
          currentPhotoSwipe?.refreshSlideContent(index);
        });
      });

      const destroy = useEventListener("wheel", () => {
        currentPhotoSwipe?.close();
      });

      return {
        open: (index: number): void => {
          currentPhotoSwipe?.close();

          currentPhotoSwipe = new PhotoSwipe({
            preloaderDelay: 0,
            showHideAnimationType: "zoom",
            ...photoSwipeOptions,
            dataSource,
            index,
            ...(scrollToClose
              ? { closeOnVerticalDrag: true, wheelToZoom: false }
              : {}),
          });

          initPhotoSwipe(currentPhotoSwipe);

          currentPhotoSwipe.addFilter("placeholderSrc", () => images[index]);
          currentPhotoSwipe.init();
        },
        close: (): void => {
          currentPhotoSwipe?.close();
        },
        destroy,
      };
    },
  );
