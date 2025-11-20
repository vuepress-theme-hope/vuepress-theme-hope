import type { GalleryItem } from "lightgallery/lg-utils.js";
import LightGallery from "lightgallery/lightgallery.es5.js";
import type { LightGallery as LightGalleryType } from "lightgallery/lightgallery.js";
import type { VNode } from "vue";
import { defineComponent, h, onUnmounted, shallowRef } from "vue";
import { onContentUpdated } from "vuepress/client";

import { useLightGalleryPlugins } from "@temp/lightgallery/plugins.js";

import { useLightGalleryOptions } from "../helpers/index.js";

import "lightgallery/scss/lightgallery.scss";

declare const __LG_SELECTOR__: string;

const getImages = (images: HTMLImageElement[]): GalleryItem[] =>
  images.map(
    ({ alt, srcset, src }) =>
      ({
        src,
        srcset,
        thumb: src || srcset,
        alt,
        subHtml: alt,
      }) as GalleryItem,
  );

export default defineComponent({
  name: "LightGallery",

  setup() {
    const lightGalleryOptions = useLightGalleryOptions();

    const container = shallowRef<HTMLElement>();

    let instance: LightGalleryType | null = null;
    let id: number;

    const initLightGallery = async (): Promise<void> => {
      const timeID = (id = Date.now());

      const lightGalleryPlugins = await useLightGalleryPlugins();

      if (timeID === id) {
        instance?.destroy();

        const images = [
          ...document.querySelectorAll<HTMLImageElement>(__LG_SELECTOR__),
        ];

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        instance = new LightGallery(container.value!, {
          ...lightGalleryOptions,
          dynamic: true,
          dynamicEl: getImages(images),
          // This is a licenseKey to make this project under MIT, special thanks to @Sachin
          licenseKey: "VSY7R-J@WED-CJY76-UMDXQ",
          plugins: lightGalleryPlugins.map(({ default: plugin }) => plugin),
        });

        images.forEach((image, index) => {
          image.addEventListener("click", () => {
            instance?.openGallery(index);
          });
        });
      }
    };

    onContentUpdated(async (reason) => {
      if (reason !== "beforeUnmount") await initLightGallery();
    });

    onUnmounted(() => instance?.destroy());

    return (): VNode =>
      h("div", { ref: container, class: "lightgallery-vuepress" });
  },
});
