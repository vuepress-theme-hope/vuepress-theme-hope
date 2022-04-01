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

export const getImages = (selector: string): Promise<PhotoSwipeImages> => {
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(selector)
  );

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
