import { useFullscreen } from "@vueuse/core";
import type PhotoSwipe from "photoswipe";

export const initPhotoSwipe = (photoSwipe: PhotoSwipe): void => {
  const { isSupported, toggle } = useFullscreen();

  photoSwipe.on("uiRegister", () => {
    if (isSupported.value)
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
