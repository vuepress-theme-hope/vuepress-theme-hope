import { type PhotoSwipeOptions as OriginalPhotoSwipeOptions } from "photoswipe";

export type SupportedPhotoSwipeOptions = Exclude<
  OriginalPhotoSwipeOptions,
  // these are handled internally
  | "dataSource"
  | "index"
  // functions and objects are not supported yet
  | "appendToEl"
  | "getViewportSizeFn"
  | "getClickedIndexFn"
  | "paddingFn"
  | "openPromise"
  | "pswpModule"
>;
