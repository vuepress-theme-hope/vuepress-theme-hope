declare module "photoswipe" {
  export interface DataSourceItem extends Record<string, unknown> {
    src: string;
    width: number;
    height: number;
    alt: string;
  }

  export interface PhotoSwipeInitOptions {
    dataSource?: DataSourceItem[];
    appendToEl?: HTMLElement;

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

  export interface PhotoSwipePoint {
    x: number;
    y: number;
  }

  export interface ElementData<Element extends HTMLElement = HTMLElement> {
    /**
     * Unique name of the UI element,
     */
    name: string;

    /**
     * Class name of the element.
     *
     * If not defined - name will be used in format pswp__button--name, or pswp__name
     */
    className?: string;

    /**
     * Order of element
     *
     * default order elements:
     *
     * - counter: 5
     * - zoom button: 10
     * - info: 15
     * - close: 20
     */
    order: number;

    /**
     * If element should be rendered as button
     */
    isButton?: boolean;

    /**
     * Element tag name
     *
     * if not defined - button or div will be used
     */
    tagName?: string;

    /**
     * Button title
     */
    title?: string;

    /**
     * html string, will be added inside button
     * can also be an object with svg data
     */
    html?: string | Record<string, unknown>;

    /**
     * Element container, possible values:
     *
     * - 'bar'  (top toolbar, .pswp__top-bar, default value),
     * - 'wrapper' (scroll viewport wrapper, .pswp__scroll-wrap),
     * - 'root' (root element of the dialog, .pswp)
     *
     * @description If you add a text inside 'wrapper' - it won’t be selectable, as PhotoSwipe intersects all touch events there.
     */
    appendTo?: "bar" | "wrapper" | "root";

    /**
     * callback is triggered right before corresponding element is added to DOM (while dialog is opening/creating)
     */
    onInit?: (el: Element, pswp: PhotoSwipe) => void;

    /**
     * when user clicks or taps on element
     */
    onClick?: (event: Event, el: Element, pswp: PhotoSwipe) => void;
  }

  class UI {
    constructor(pswp: PhotoSwipe): void;

    init(): void;

    registerElement<Element extends HTMLElement = HTMLElement>(
      elementData: ElementData<Element>
    ): void;
  }

  class Slide {
    constructor(data: DataSourceItem, index: number, pswp: PhotoSwipe);

    data: DataSourceItem;
    index: number;
    pswp: PhotoSwipe;
    isActive: boolean;
    currentResolution: number;

    width: number;
    height: number;
    currZoomLevel: number;
    container: HTMLElement;
    pan: PhotoSwipePoint;

    setIsActive();
  }

  export default class PhotoSwipe {
    constructor(options: PhotoSwipeInitOptions);

    init(): void;

    ui: UI;

    currSlide: Slide;

    /**
     * Get looped slide index
     * (for example, -1 will return the last slide)
     *
     */
    getLoopedIndex(index: number): void;

    appendHeavy(): void;

    /**
     * Change the slide
     */
    goTo(index: number): void;

    /**
     * Go to the next slide.
     */
    next(): void;

    /**
     * Go to the previous slide.
     */
    prev(index: number): void;

    /**
     * Zoom current slide image to...
     *
     * @param   destZoomLevel      Destination zoom level.
     * @param   centerPoint  Transform origin center point,
     *                                     or false if viewport center should be used.
     * @param  transitionDuration Transition duration, may be set to 0.
     * @param   ignoreBounds Minimum and maximum zoom levels will be ignored.
     */
    zoomTo(
      destZoomLevel: number,
      centerPoint: PhotoSwipePoint | false,
      transitionDuration: number,
      ignoreBounds?: boolean | null
    ): void;

    toggleZoom(): void;

    /**
     * Close the gallery.
     * After closing transition ends - destroy it
     */
    close(): void;

    /**
     * Destroys the gallery:
     * - instantly closes the gallery
     * - unbinds events,
     * - cleans intervals and timeouts
     * - removes elements from DOM
     */
    destroy(): void;

    /**
     * Refresh/reload content of a slide by its index
     */
    refreshSlideContent(slideIndex: number): void;

    /**
     * Set slide content
     *
     * @param  holder mainScroll.itemHolders array item
     * @param index Slide index
     * @param force If content should be set even if index wasn’t changed
     */
    setContent(holder: unknown[], index: number, force: boolean): void;

    getViewportCenterPoint(): PhotoSwipePoint;

    /**
     * Update size of all elements.
     * Executed on init and on page resize.
     *
     * @param force Update size even if size of viewport was not changed.
     */
    updateSize(force: boolean): void;

    applyBgOpacity(opacity: number): void;

    /**
     * Whether mouse is detected
     */
    mouseDetected(): void;

    /**
     * Event listener
     */
    on(eventName: string, callback: (...args: any[]) => void): void;
  }
}
