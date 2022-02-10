import * as PhotoSwipe from "photoswipe";

export interface PhotoSwipeImageInfo extends PhotoSwipe.Item {
  title: string;
}

export const getImageInfo = (image: HTMLImageElement): PhotoSwipeImageInfo => {
  return {
    src: image.src,
    w: image.naturalWidth,
    h: image.naturalHeight,
    title: image.alt,
  };
};

export interface PhotoSwipeImages {
  elements: HTMLImageElement[];
  infos: PhotoSwipeImageInfo[];
}

export const getImages = (selector: string): Promise<PhotoSwipeImages> => {
  const promises: Promise<PhotoSwipeImageInfo>[] = [];
  const images = Array.from(
    document.querySelectorAll<HTMLImageElement>(selector)
  );

  images.forEach((image, index) => {
    promises[index] = new Promise((resolve, reject) => {
      if (image.complete) resolve(getImageInfo(image));
      else {
        image.onload = (): void => resolve(getImageInfo(image));
        image.onerror = (err): void => reject(err);
      }
    });
  });

  return Promise.all(promises).then((infos) => ({ elements: images, infos }));
};
