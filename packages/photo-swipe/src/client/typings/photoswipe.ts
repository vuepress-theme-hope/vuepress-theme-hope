import type {
  DataSourceItem,
  PhotoSwipeInitOptions,
} from "../../shared/index.js";

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

interface UI {
  (pswp: PhotoSwipe): UI;

  init(): void;

  registerElement<Element extends HTMLElement = HTMLElement>(
    elementData: ElementData<Element>
  ): void;
}

interface Slide {
  (data: DataSourceItem, index: number, pswp: PhotoSwipe): Slide;

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

  setIsActive(): void;
}

export interface PhotoSwipe {
  (options: PhotoSwipeInitOptions): PhotoSwipe;

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
