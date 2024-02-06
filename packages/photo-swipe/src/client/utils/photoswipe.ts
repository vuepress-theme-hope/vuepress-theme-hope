import { useEventListener, useFullscreen } from "@vueuse/core";
import type PhotoSwipe from "photoswipe";
import type { SlideData } from "photoswipe";

import { LOADING_ICON } from "./icon.js";
import { getImageElementInfo, getImageUrlInfo } from "./images.js";
import { scrollToClose } from "../define.js";
import type { PhotoSwipeOptions } from "../helpers/index.js";

export const registerPhotoswipeUI = (photoSwipe: PhotoSwipe): void => {
  const { isSupported, toggle } = useFullscreen();

  photoSwipe.on("uiRegister", () => {
    if (isSupported)
      // add fullscreen button
      photoSwipe.ui!.registerElement({
        name: "fullscreen",
        order: 7,
        isButton: true,

        html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',

        onClick: () => {
          void toggle();
        },
      });

    // add download button
    photoSwipe.ui!.registerElement({
      name: "download",
      order: 8,
      isButton: true,
      tagName: "a",

      // SVG with outline
      html: {
        isCustomSVG: true,
        inner:
          '<path d="M20.5 14.3 17.1 18V10h-2.2v7.9l-3.4-3.6L10 16l6 6.1 6-6.1-1.5-1.6ZM23 23H9v2h14" id="pswp__icn-download"/>',
        outlineID: "pswp__icn-download",
      },

      onInit: (el, photoSwipe) => {
        el.setAttribute("download", "");
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");

        photoSwipe.on("change", () => {
          el.setAttribute("href", photoSwipe.currSlide!.data.src!);
        });
      },
    });

    // add bullets indicator
    photoSwipe.ui!.registerElement({
      name: "bulletsIndicator",
      className: "photo-swipe-bullets-indicator",
      appendTo: "wrapper",
      onInit: (el, photoSwipe) => {
        const bullets: HTMLElement[] = [];
        let prevIndex = -1;

        for (let i = 0; i < photoSwipe.getNumItems(); i++) {
          const bullet = document.createElement("div");

          bullet.className = "photo-swipe-bullet";
          bullet.onclick = (event: Event): void => {
            photoSwipe.goTo(bullets.indexOf(<HTMLElement>event.target));
          };
          bullets.push(bullet);
          el.appendChild(bullet);
        }

        photoSwipe.on("change", () => {
          if (prevIndex >= 0) bullets[prevIndex].classList.remove("active");

          bullets[photoSwipe.currIndex].classList.add("active");
          prevIndex = photoSwipe.currIndex;
        });
      },
    });
  });
};

export const registerPhotoSwipe = (
  images: HTMLImageElement[],
  photoSwipeOptions: PhotoSwipeOptions,
): Promise<() => void> =>
  import(/* webpackChunkName: "photo-swipe" */ "photoswipe").then(
    ({ default: PhotoSwipe }) => {
      const dataSource = images.map<SlideData>((image) => ({
        html: LOADING_ICON,
        element: image,
        msrc: image.src,
      }));

      let instance: PhotoSwipe;

      images.forEach((image, index) => {
        void getImageElementInfo(image).then((data) => {
          dataSource.splice(index, 1, data);
          instance?.refreshSlideContent(index);
        });
      });

      images.forEach((image, index) => {
        const handler = (): void => {
          instance = new PhotoSwipe({
            preloaderDelay: 0,
            showHideAnimationType: "zoom",
            ...photoSwipeOptions,
            dataSource,
            index,
            ...(scrollToClose
              ? { closeOnVerticalDrag: true, wheelToZoom: false }
              : {}),
          });

          registerPhotoswipeUI(instance);

          instance.addFilter("thumbEl", () => image);
          instance.addFilter("placeholderSrc", () => image.src);
          instance.init();
        };

        image.style.cursor = "zoom-in";
        image.addEventListener("click", () => {
          void handler();
        });
        image.addEventListener("keypress", ({ key }) => {
          if (key === "Enter") void handler();
        });
      });

      return scrollToClose
        ? useEventListener("wheel", () => {
            instance?.close();
          })
        : (): void => {
            // do nothing
          };
    },
  );

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
      const dataSource = images.map<SlideData>((image) => ({
        html: LOADING_ICON,
        msrc: image,
      }));

      let instance: PhotoSwipe | null = null;

      images.forEach((image, index) => {
        void getImageUrlInfo(image).then((data) => {
          dataSource.splice(index, 1, data);
          instance?.refreshSlideContent(index);
        });
      });

      const destroy = useEventListener("wheel", () => {
        instance?.close();
      });

      return {
        open: (index: number): void => {
          const image = images[index];

          instance?.close();

          instance = new PhotoSwipe({
            preloaderDelay: 0,
            showHideAnimationType: "zoom",
            ...photoSwipeOptions,
            dataSource,
            index,
            ...(scrollToClose
              ? { closeOnVerticalDrag: true, wheelToZoom: false }
              : {}),
          });

          registerPhotoswipeUI(instance);

          instance.addFilter("placeholderSrc", () => image);
          instance.init();
        },
        close: (): void => {
          instance?.close();
        },
        destroy,
      };
    },
  );
