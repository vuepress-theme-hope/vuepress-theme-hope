export interface DataSourceItem extends Record<string, unknown> {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface PhotoSwipeInitOptions {
  dataSource?: DataSourceItem[];

  // Not supported in node side
  // appendToEl?: HTMLElement;

  /**
   * Allow swipe navigation to next/prev item when current item is zoomed.
   * Option is always false on devices that don’t have hardware touch support.
   *
   * @default true
   */

  allowPanToNext?: boolean;

  /**
   * Spacing ratio between slides. For example, 0.12 will render as a 12% of sliding viewport width (rounded).
   *
   * @default 0.12
   */
  spacing?: number;

  /**
   * Loop slides when using swipe gesture.If set to true you'll be able to swipe from last to first image.
   * Option is always false when there are less than 3 slides.
   * This option has no relation to arrows navigation. Arrows loop is turned on permanently. You can modify this behavior by making custom UI.
   *
   * @default true
   */
  loop?: boolean;
  pinchToClose?: boolean;

  /**
   * Close gallery when dragging vertically and when image is not zoomed. Always false when mouse is used.
   *
   * @default true
   */
  closeOnVerticalDrag?: boolean;

  /**
   * Initial zoom-in transition duration in milliseconds. Set to 0 to disable.
   *
   * @default 333
   */
  showAnimationDuration?: number;

  /**
   * The same as the previous option, just for closing (zoom-out) transition.
   * After PhotoSwipe is opened pswp--open class will be added to the root element, you may use it to apply different transition duration in CSS.
   *
   * @default 333
   */
  hideAnimationDuration?: number;

  zoomAnimationDuration?: number;

  /**
   * esc keyboard key to close PhotoSwipe. Option can be changed dynamically (yourPhotoSwipeInstance.options.escKey = false;).
   *
   * @default true
   */
  escKey?: boolean;

  /**
   * Keyboard left or right arrow key navigation. Option can be changed dynamically (yourPhotoSwipeInstance.options.arrowKeys = false;).
   *
   * @default true
   */
  arrowKeys?: boolean;
  returnFocus?: boolean;
  maxWidthToAnimate?: number;
  clickToCloseNonZoomable?: boolean;
  imageClickAction?: string;
  bgClickAction?: string;
  tapAction?: string;
  doubleTapAction?: string;
  indexIndicatorSep?: string;
  preloaderDelay?: number;

  /**
   * Background opacity.
   * Should be a number from 0 to 1, e.g. 0.7.
   *
   * @default 1
   */
  bgOpacity?: number;

  /**
   * Start slide index. 0 is the first slide. Must be integer, not a string.
   *
   * @default 0
   */

  index?: number;
  errorMsg?: string;

  /**
   * Lazy loading of nearby slides based on direction of movement.
   * Should be an array with two integers, first one - number of items to preload before current image, second one - after the current image.
   * E.g. if you set it to [1,3], it'll load 1 image before the current, and 3 images after current. Values can not be less than 1.
   *
   * Default [1, 2].
   */
  preload?: number[];

  easing?: string;

  /**
   * String with name of class that will be added to root element of PhotoSwipe (.pswp). Can contain multiple classes separated by space.
   */
  mainClass?: string;

  /**
   * Whether display arrowPrev button
   *
   * @default true
   */
  arrowPrev?: boolean;

  /**
   * Whether display arrowNext button
   *
   * @default true
   */
  arrowNext?: boolean;

  /**
   * Whether display close button
   *
   * @default true
   */
  close?: boolean;

  /**
   * Whether display zoom button
   *
   * @default true
   */
  zoom?: boolean;

  /**
   * arrowPrev button svg
   */
  arrowPrevSVG?: string;

  /**
   * arrowNext button svg
   */
  arrowNextSVG?: string;

  /**
   * close button svg
   */
  closeSVG?: string;

  /**
   * zoom button svg
   */
  zoomSVG?: string;

  /**
   * arrowPrev button title
   */
  arrowPrevTitle?: string;

  /**
   * arrowNext button title
   */
  arrowNextTitle?: string;

  /**
   * close button title
   */
  closeTitle?: string;

  /**
   * zoom button title
   */
  zoomTitle?: string;
}
