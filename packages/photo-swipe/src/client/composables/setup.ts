import { usePageData } from "@vuepress/client";
import { useEventListener, useFullscreen } from "@vueuse/core";
import type { SlideData } from "photoswipe";
import PhotoSwipe from "photoswipe";
import { nextTick, onMounted, watch } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { delay, imageSelector, locales, scrollToClose } from "../define.js";
import { usePhotoSwipeOptions } from "../helpers/index.js";
import { LOADING_ICON, getImageInfo, getImages } from "../utils/index.js";

import "photoswipe/dist/photoswipe.css";
import "../styles/photo-swipe.scss";

export const setupPhotoSwipe = (): void => {
  const { isSupported, toggle } = useFullscreen();
  const photoSwipeOptions = usePhotoSwipeOptions();
  const locale = useLocaleConfig(locales);
  const page = usePageData();

  let instance: PhotoSwipe;

  const registerPhotoswipeUI = (photoSwipe: PhotoSwipe): void => {
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

  const initPhotoSwipe = (): Promise<void> =>
    Promise.all([
      import(/* webpackChunkName: "photo-swipe" */ "photoswipe"),
      nextTick().then(() =>
        new Promise<void>((resolve) => setTimeout(resolve, delay)).then(() =>
          getImages(imageSelector),
        ),
      ),
    ]).then(([{ default: PhotoSwipe }, images]) => {
      const dataSource = images.map<SlideData>((image) => ({
        html: LOADING_ICON,
        element: image,
        msrc: image.src,
      }));

      images.forEach((image, index) => {
        const handler = (): void => {
          instance = new PhotoSwipe({
            preloaderDelay: 0,
            showHideAnimationType: "zoom",
            ...locale.value,
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

      images.forEach((image, index) => {
        void getImageInfo(image).then((data) => {
          dataSource.splice(index, 1, data);
          instance?.refreshSlideContent(index);
        });
      });
    });

  onMounted(() => {
    if (scrollToClose)
      useEventListener("wheel", () => {
        instance?.close();
      });

    void initPhotoSwipe();

    watch(
      () => page.value.path,
      () => initPhotoSwipe(),
    );
  });
};
