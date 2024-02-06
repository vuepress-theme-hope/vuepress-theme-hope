import { isString } from "@vuepress/helper/client";
import type { SlideData } from "photoswipe";

export const getImages = (selector: string | string[]): HTMLImageElement[] =>
  isString(selector)
    ? Array.from(document.querySelectorAll<HTMLImageElement>(selector))
    : selector
        .map((item) =>
          Array.from(document.querySelectorAll<HTMLImageElement>(item)),
        )
        .flat();

export const getImageElementInfo = (
  image: HTMLImageElement,
): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    if (image.complete) {
      resolve({
        type: "image",
        element: image,
        src: image.src,
        width: image.naturalWidth,
        height: image.naturalHeight,
        alt: image.alt,
        msrc: image.src,
      });
    } else {
      image.onload = (): void => resolve(getImageElementInfo(image));
      image.onerror = (err): void => reject(err);
    }
  });

export const getImageUrlInfo = (image: string): Promise<SlideData> =>
  new Promise<SlideData>((resolve, reject) => {
    const el = new Image();

    el.src = image;
    el.onload = (): void => resolve(getImageElementInfo(el));
    el.onerror = (err): void => reject(err);
  });
