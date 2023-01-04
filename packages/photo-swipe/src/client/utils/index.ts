import { isString } from "@vuepress/shared";

import type { DataSourceItem } from "photoswipe";

export const getImageInfo = (image: HTMLImageElement): DataSourceItem => ({
  src: image.src,
  width: image.naturalWidth,
  height: image.naturalHeight,
  alt: image.alt,
});

export interface PhotoSwipeImages {
  elements: HTMLImageElement[];
  infos: DataSourceItem[];
}

export const getImages = (
  selector: string | string[]
): Promise<PhotoSwipeImages> => {
  const images = isString(selector)
    ? Array.from(document.querySelectorAll<HTMLImageElement>(selector))
    : selector
        .map((item) =>
          Array.from(document.querySelectorAll<HTMLImageElement>(item))
        )
        .flat();

  return Promise.all(
    images.map(
      (image) =>
        new Promise<DataSourceItem>((resolve, reject) => {
          if (image.complete) resolve(getImageInfo(image));
          else {
            image.onload = (): void => resolve(getImageInfo(image));
            image.onerror = (err): void => reject(err);
          }
        })
    )
  ).then((infos) => ({ elements: images, infos }));
};
