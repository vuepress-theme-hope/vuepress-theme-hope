import { isString } from "@vuepress/shared";
import { type DataSourceItem } from "photoswipe";

export const getImages = (selector: string | string[]): HTMLImageElement[] =>
  isString(selector)
    ? Array.from(document.querySelectorAll<HTMLImageElement>(selector))
    : selector
        .map((item) =>
          Array.from(document.querySelectorAll<HTMLImageElement>(item))
        )
        .flat();

export const getImageInfo = (
  image: HTMLImageElement
): Promise<DataSourceItem> =>
  new Promise<DataSourceItem>((resolve, reject) => {
    if (image.complete) {
      resolve({
        src: image.src,
        width: image.naturalWidth,
        height: image.naturalHeight,
        alt: image.alt,
      });
    } else {
      image.onload = (): void => resolve(getImageInfo(image));
      image.onerror = (err): void => reject(err);
    }
  });
