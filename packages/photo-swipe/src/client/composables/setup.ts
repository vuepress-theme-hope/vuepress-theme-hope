import { usePageData } from "@vuepress/client";
import { useFullscreen } from "@vueuse/core";
import { nextTick, onMounted, watch } from "vue";
import { useLocaleConfig } from "vuepress-shared/client";

import { delay, imageSelector, locales, options } from "../define.js";
import { getImageInfo, getImages } from "../utils/index.js";

import "photoswipe/dist/photoswipe.css";
import "../styles/photo-swipe.scss";

export const setupPhotoSwipe = (): void => {
  const { isSupported, toggle } = useFullscreen();
  const locale = useLocaleConfig(locales);
  const page = usePageData();

  const initPhotoSwipe = (): Promise<void> =>
    Promise.all([
      import(/* webpackChunkName: "photo-swipe" */ "photoswipe"),
      nextTick().then(() =>
        new Promise<void>((resolve) => setTimeout(resolve, delay)).then(() =>
          getImages(imageSelector)
        )
      ),
    ]).then(([{ default: PhotoSwipe }, images]) => {
      const LOADING_ICON =
        '<div class="photo-swipe-loading"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" preserveAspectRatio="xMidYMid" viewBox="25 25 50 50"><animateTransform attributeName="transform" type="rotate" dur="2s" keyTimes="0;1" repeatCount="indefinite" values="0;360"></animateTransform><circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"><animate attributeName="stroke-dasharray" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="1,200;90,200;1,200"></animate><animate attributeName="stroke-dashoffset" dur="1.5s" keyTimes="0;0.5;1" repeatCount="indefinite" values="0;-35px;-125px"></animate></circle></svg></div>';

      images.forEach((image, index) => {
        const handler = (): void => {
          const dataSource = Array(images.length).fill({
            html: LOADING_ICON,
          });

          const photoSwipe = new PhotoSwipe({
            dataSource,
            preloaderDelay: 0,
            ...locale.value,
            ...options,
            index,
          });

          photoSwipe.on("uiRegister", () => {
            if (isSupported)
              // add fullscreen button
              photoSwipe.ui.registerElement({
                name: "fullscreen",
                order: 7,
                isButton: true,

                html: '<svg class="pswp__icn" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M249.5 270.833H437v-75H212a37.5 37.5 0 0 0-37.5 37.5v225h75v-187.5zm-37.5 600h225v-75H249.5v-187.5h-75v225a37.5 37.5 0 0 0 37.5 37.5zm637.5-37.5v-225h-75v187.5H587v75h225a37.5 37.5 0 0 0 37.5-37.5zM587 270.833h187.5v187.5h75v-225a37.5 37.5 0 0 0-37.5-37.5H587v75z"/></svg>',

                onClick: () => {
                  void toggle();
                },
              });

            // add download button
            photoSwipe.ui.registerElement({
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

              onInit: (el: HTMLAnchorElement, photoSwipe) => {
                el.setAttribute("download", "");
                el.setAttribute("target", "_blank");
                el.setAttribute("rel", "noopener");

                photoSwipe.on("change", () => {
                  el.href = photoSwipe.currSlide.data.src;
                });
              },
            });
          });

          photoSwipe.init();

          images.forEach((image, index) => {
            void getImageInfo(image).then((data) => {
              dataSource.splice(index, 1, data);
              photoSwipe.refreshSlideContent(index);
            });
          });
        };

        image.style.cursor = "zoom-in";
        image.addEventListener("click", () => {
          void handler();
        });
        image.addEventListener("keypress", ({ key }) => {
          if (key === "Enter") void handler();
        });
      });
    });

  onMounted(() => {
    void initPhotoSwipe();

    watch(
      () => page.value.path,
      () => initPhotoSwipe()
    );
  });
};
