/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "reveal.js/dist/reveal.esm.js" {
  export interface RevealOptions {
    /**
     * The "normal" size of the presentation, aspect ratio will be preserved when the presentation is scaled to fit different resolutions.
     *
     * Can be specified using percentage units.
     */
    width: number;
    height: number;

    /** Factor of the display size that should remain empty around the content */
    margin: number;

    /** Bounds for smallest/largest possible scale to apply to content */
    minScale: number;
    maxScale: number;

    /** Display presentation control arrows */
    controls: boolean;

    /** Help the user learn the controls by providing hints, for example by bouncing the down arrow when they first encounter a vertical slide */
    controlsTutorial: boolean;

    /** Determines where controls appear */
    controlsLayout: "bottom-right" | "edges";

    /** Visibility rule for backwards navigation arrows */
    controlsBackArrows: "faded" | "hidden" | "visible";

    /** Display a presentation progress bar */
    progress: boolean;

    /**
     * Display the page number of the current slide
     * - true:    Show slide number
     * - false:   Hide slide number
     *
     * Can optionally be set as a string that specifies the number formatting:
     * - "h.v":   Horizontal . vertical slide number (default)
     * - "h/v":   Horizontal / vertical slide number
     * - "c":   Flattened slide number
     * - "c/t":   Flattened slide number / total slides
     *
     * Alternatively, you can provide a function that returns the slide
     * number for the current slide. The function should take in a slide
     * object and return an array with one string [slideNumber] or
     * three strings [n1,delimiter,n2]. See #formatSlideNumber().
     */
    slideNumber:
      | boolean
      | "h.v"
      | "h/v"
      | "c"
      | "c/t"
      | ((slideObject: any) => [string] | [string, string, string]);

    /**
     * Can be used to limit the contexts in which the slide number appears
     *
     * - "all":      Always show the slide number
     * - "print":    Only when printing to PDF
     * - "speaker":  Only in the speaker view
     */
    showSlideNumber: "all" | "print" | "speaker";

    /** Use 1 based indexing for # links to match slide number (default is zero based) */
    hashOneBasedIndex: boolean;

    /** Add the current slide number to the URL hash so that reloading the page/copying the URL will return you to the same slide */
    hash: boolean;

    /** Flags if we should monitor the hash and change slides accordingly */
    respondToHashChanges: boolean;

    /** Push each slide change to the browser history.  Implies `hash: true` */
    history: boolean;

    /** Enable keyboard shortcuts for navigation */
    keyboard: boolean;

    /**
     * Optional function that blocks keyboard events when retuning false
     *
     * If you set this to 'focused', we will only capture keyboard events
     * for embedded decks when they are in focus
     */
    keyboardCondition: null | "focused" | ((event: KeyboardEvent) => boolean);

    /** Disables the default reveal.js slide layout (scaling and centering) so that you can use custom CSS layout */
    disableLayout: boolean;

    /** Enable the slide overview mode */
    overview: boolean;

    /** Vertical centering of slides */
    center: boolean;

    /** Enables touch navigation on devices with touch input */
    touch: boolean;

    /** Loop the presentation */
    loop: boolean;

    /** Change the presentation direction to be RTL */
    rtl: boolean;

    /**
     * Changes the behavior of our navigation directions.
     *
     * "default"
     * Left/right arrow keys step between horizontal slides, up/down
     * arrow keys step between vertical slides. Space key steps through
     * all slides (both horizontal and vertical).
     *
     * "linear"
     * Removes the up/down arrows. Left/right arrows step through all
     * slides (both horizontal and vertical).
     *
     * "grid"
     * When this is enabled, stepping left/right from a vertical stack
     * to an adjacent vertical stack will land you at the same vertical
     * index.
     *
     * Consider a deck with six slides ordered in two vertical stacks:
     * 1.1    2.1
     * 1.2    2.2
     * 1.3    2.3
     *
     * If you’re on slide 1.3 and navigate right, you will normally move
     * from 1.3 -> 2.1. If "grid" is used, the same navigation takes you
     * from 1.3 -> 2.3.
     */
    navigationMode: "default" | "linear" | "grid";

    /** Randomizes the order of slides each time the presentation loads */
    shuffle: boolean;

    /** Turns fragments on and off globally */
    fragments: boolean;

    /** Flags whether to include the current fragment in the URL, so that reloading brings you to the same fragment position */
    fragmentInURL: boolean;

    /** Flags if the presentation is running in an embedded mode, i.e. contained within a limited portion of the screen */
    embedded: boolean;

    /** Flags if we should show a help overlay when the question-mark key is pressed */
    help: boolean;

    /**  Flags if it should be possible to pause the presentation (blackout) */
    pause: boolean;

    /** Flags if speaker notes should be visible to all viewers */
    showNotes: boolean;

    /**
     * Global override for auto playing embedded media (video/audio/iframe)
     *- null:   Media will only autoplay if data-autoplay is present
     *- true:   All media will autoplay, regardless of individual setting
     *- false:  No media will autoplay, regardless of individual setting
     */
    autoPlayMedia: null | boolean;

    /**
     * Global override for preloading lazy-loaded iframes
     * - null:   Iframes with data-src AND data-preload will be loaded when within
     *           the viewDistance, iframes with only data-src will be loaded when visible
     * - true:   All iframes with data-src will be loaded when within the viewDistance
     * - false:  All iframes with data-src will be loaded only when visible
     */
    preloadIframes: null | boolean;

    /** Can be used to globally disable auto-animation */
    autoAnimate: boolean;

    /** Optionally provide a custom element matcher that will be used to dictate which elements we can animate between. */
    autoAnimateMatcher: null;

    /** Default settings for our auto-animate transitions, can be overridden per-slide or per-element via data arguments */
    autoAnimateEasing: "ease" | "ease-in" | "ease-out" | "linear";
    autoAnimateDuration: number;
    autoAnimateUnmatched: boolean;

    /**
     * CSS properties that can be auto-animated.
     *
     * Position & scale is matched separately so there's no need to include styles like top/right/bottom/left, width/height or margin
     */
    autoAnimateStyles: string[];

    /**
     * Controls automatic progression to the next slide
     * - 0:      Auto-sliding only happens if the data-autoslide HTML attribute
     *           is present on the current slide or fragment
     * - 1+:     All slides will progress automatically at the given interval
     * - false:  No auto-sliding, even if data-autoslide is present
     */
    autoSlide: number | false;

    /** Stop auto-sliding after user input */
    autoSlideStoppable: boolean;

    /** Use this method for navigation when auto-sliding (defaults to navigateNext) */

    autoSlideMethod: null | any;

    /** Specify the average time in seconds that you think you will spend presenting each slide. This is used to show a pacing timer in the speaker view */
    defaultTiming: null | number;

    /** Enable slide navigation via mouse wheel */
    mouseWheel: boolean;

    /**
     * Opens links in an iframe preview overlay
     * Add `data-preview-link` and `data-preview-link="false"` to customize each link individually
     */
    previewLinks: boolean;

    /** Exposes the reveal.js API through window.postMessage */
    postMessage: boolean;

    /** Dispatches all reveal.js events to the parent window through postMessage */
    postMessageEvents: boolean;

    /** Focuses body when page changes visibility to ensure keyboard shortcuts work */
    focusBodyOnPageVisibilityChange: boolean;

    /** Transition style */
    transition: "none" | "slide" | "fade" | "convex" | "concave" | "zoom"; // none/fade/slide/convex/concave/zoom

    /** Transition speed */
    transitionSpeed: "default" | "fast" | "slow";

    /** Transition style for full page slide backgrounds */
    backgroundTransition:
      | "none"
      | "fade"
      | "slide"
      | "convex"
      | "concave"
      | "zoom";

    /** The maximum number of pages a single slide can expand onto when printing to PDF, unlimited by default */
    pdfMaxPagesPerSlide: number;

    /** Prints each fragment on a separate slide */
    pdfSeparateFragments: boolean;

    /**
     * Offset used to reduce the height of content within exported PDF pages.
     * This exists to account for environment differences based on how you
     * print to PDF. CLI printing options, like phantomjs and wkpdf, can end
     * on precisely the total height of the document whereas in-browser
     * printing has to end one pixel before.
     */
    pdfPageHeightOffset: number;

    /** Number of slides away from the current that are visible */
    viewDistance: number;

    /**
     * Number of slides away from the current that are visible on mobile devices.
     *
     * It is advisable to set this to a lower number than viewDistance in order to save resources.
     */
    mobileViewDistance: number;

    /** The display mode that will be used to show slides */
    display: "block";

    /** Hide cursor if inactive */
    hideInactiveCursor: boolean;

    /** Time before the cursor is hidden (in ms) */
    hideCursorTime: number;

    plugins: any[];
  }

  interface RevealState {
    indexh?: number;
    indexv?: number;
    indexf?: number;
    paused?: boolean;
    overview?: boolean;
  }

  class Reveal {
    constructor(options?: Partial<RevealOptions>);
    constructor(selector: HTMLElement, options?: Partial<RevealOptions>);
    /** Starts up the presentation if the client is capable. */
    initialize(config?: Partial<RevealOptions>): Promise<void>;
    /**
     * undo all changes that the framework has made to the DOM, remove all event listeners and unregister/destroy all plugins.
     */
    destroy(): void;
    /**
     * Applies the configuration settings from the config
     * object. May be called multiple times.
     */
    configure(config: Partial<RevealOptions>): void;

    /**
     * Syncs the presentation with the current DOM. Useful
     * when new slides or control elements are added or when
     * the configuration has changed.
     */
    sync(): void;

    /**
     * Updates reveal.js to keep in sync with new slide attributes. For
     * example, if you add a new `data-background-image` you can call
     * this to have reveal.js render the new background image.
     *
     * Similar to #sync() but more efficient when you only need to
     * refresh a specific slide.
     */
    syncSlide(slide: HTMLElement): void;

    /**
     * Formats the fragments on the given slide so that they have
     * valid indices. Call this if fragments are changed in the DOM
     * after reveal.js has already initialized.
     *
     * @param slide
     * @return a list of the HTML fragments that were synced
     */
    syncFragments(slide: HTMLElement): HTMLElement[];

    /**
     * Steps from the current point in the presentation to the
     * slide which matches the specified horizontal and vertical
     * indices.
     *
     * @param [h=indexh] Horizontal index of the target slide
     * @param [v=indexv] Vertical index of the target slide
     * @param [f] Index of a fragment within the
     * target slide to activate
     * @param [o] Origin for use in multimaster environments
     */
    slide(h?: number, v?: number, f?: number, o?: number): void;

    left(): void;

    right(): void;

    up(): void;

    down(): void;

    /**
     * Navigates backwards, prioritized in the following order:
     * 1) Previous fragment
     * 2) Previous vertical slide
     * 3) Previous horizontal slide
     */
    prev(): void;

    /**
     * The reverse of #navigatePrev().
     */
    next(): void;

    /**
     * Navigate to the specified slide fragment.
     *
     * @param index The index of the fragment that
     * should be shown, -1 means all are invisible
     * @param offset Integer offset to apply to the
     * fragment index
     *
     * @return true if a change was made in any
     * fragments visibility as part of this call
     */
    navigateFragment(index: number | null, offset: number): boolean;

    /**
     * Navigate to the next slide fragment.
     *
     * @return true if there was a next fragment,
     * false otherwise
     */
    nextFragment(): boolean;

    /**
     * Navigate to the previous slide fragment.
     *
     * @return true if there was a previous fragment,
     * false otherwise
     */
    prevFragment(): boolean;

    /**
     * Forces an update in slide layout
     *
     * Applies JavaScript-controlled layout rules to the
     * presentation.
     */
    layout(): void;

    /**
     * Randomly shuffles all slides in the deck.
     */
    shuffle(): void;

    /**
     * Determine what available routes there are for navigation.
     */
    availableRoutes(): {
      left: boolean;
      right: boolean;
      up: boolean;
      down: boolean;
    };

    /**
     * Returns an object describing the available fragment
     * directions.
     */
    availableFragments(): { prev: boolean; next: boolean };

    /**
     * Open or close help overlay window.
     *
     * @param [override] Flag which overrides the
     * toggle logic and forcibly sets the desired state. True means
     * help is open, false means it’s closed.
     */
    toggleHelp(override?: boolean): void;

    /**
     * Toggles the slide overview mode on and off.
     *
     * @param [override] Flag which overrides the
     * toggle logic and forcibly sets the desired state. True means
     * overview is open, false means it’s closed.
     */
    toggleOverview(override?: boolean): void;

    /**
     * Toggles the paused mode on and off.
     */
    togglePause(override?: boolean): void;

    /**
     * Toggles the auto slide mode on and off.
     *
     * @param [override] Flag which sets the desired state.
     * True means autoplay starts, false means it stops.
     */
    toggleAutoSlide(override?: boolean): void;

    /**
     * Checks if the overview is currently active.
     *
     * @return true if the overview is active,
     * false otherwise
     */
    isOverview(): boolean;

    /**
     * Checks if we are currently in the paused mode.
     */
    isPaused(): boolean;

    /**
     * Checks if the auto slide mode is currently on.
     */
    isAutoSliding(): boolean;

    /**
     * Checks if this presentation is running inside of the
     * speaker notes window.
     */
    isSpeakerNotes(): boolean;

    /**
     * Called when the given slide is within the configured view
     * distance. Shows the slide element and loads any content
     * that is set to load lazily (data-src).
     *
     * @param slide Slide to show
     */
    loadSlide(slide: HTMLElement, options?: any): void;

    /**
     * Unloads and hides the given slide. This is called when the
     * slide is moved outside of the configured view distance.

     */
    unloadSlide(slide: HTMLElement): void;

    /**
     * Binds all event listeners.
     */
    addEventListeners(): void;

    /**
     * Unbinds all event listeners.
     */
    removeEventListeners(): void;

    /**
     * Retrieves the current state of the presentation as
     * an object. This state can then be restored at any
     * time.
     */
    getState(): RevealState;

    /**
     * Restores the presentation to the given state.
     *
     * @param state As generated by getState()
     */
    setState(state: RevealState): void;

    /**
     * Returns the number of past slides. This can be used as a global
     * flattened index for slides.
     *
     * @return Past slide count
     */
    getSlidePastCount(): number;

    /**
     * Returns a value ranging from 0-1 that represents
     * how far into the presentation we have navigated.
     */
    getProgress(): number;

    /**
     * Retrieves the h/v location and fragment of the current,
     * or specified, slide.
     *
     * @param [slide] If specified, the returned
     * index will be for this slide rather than the currently
     * active one
     */
    getIndices(slide: HTMLElement): { h: number; v: number; f: number };

    /**
     * Retrieves all slides in this presentation.
     */
    getSlides(): HTMLElement[];

    /**
     * Returns an array of objects where each object represents the
     * attributes on its respective slide.
     */

    getSlidesAttributes(): Record<string, any>[];

    /**
     * Retrieves the total number of slides in this presentation.
     */
    getTotalSlides(): number;

    /**
     * Returns the slide element matching the specified index.
     */
    getSlide(x: any, y: any): HTMLElement;

    /**
     * Returns the background element for the given slide.
     * All slides, even the ones with no background properties
     * defined, have a background element so as long as the
     * index is valid an element will be returned.
     *
     * @param x Horizontal background index OR a slide
     * HTML element
     * @param y Vertical background index
     */
    getSlideBackground(
      x: number | HTMLElement,
      y: number
    ): HTMLElement[] | undefined;

    /**
     * Retrieves the speaker notes from a slide. Notes can be
     * defined in two ways:
     * 1. As a data-notes attribute on the slide <section>
     * 2. As an <aside class="notes"> inside of the slide
     *
     * @param [slide=currentSlide]
     */
    getSlideNotes(slide: HTMLElement): string | null;

    /**
     * Returns the previous slide element, may be null
     */
    getPreviousSlide(): HTMLElement | null;

    /**
     * Returns the current slide element
     */
    getCurrentSlide(): HTMLElement;

    /**
     * Returns the current scale of the presentation content
     */
    getScale(): number;

    /**
     * Returns the current configuration object
     */
    getConfig(): Partial<RevealOptions>;

    /**
     * Helper method, retrieves query string as a key/value hash
     */
    getQueryHash(): string;

    /**
     * Returns the top-level DOM element
     */
    getRevealElement(): HTMLElement;

    /**
     * Returns a hash with all registered plugins
     */

    getPlugins(): any;

    /**
     * Returns true if we're currently on the first slide
     */
    isFirstSlide(): boolean;

    /**
     * Returns true if we're currently on the last slide
     */
    isLastSlide(): boolean;

    /**
     * Returns true if we're on the last slide in the current
     * vertical stack
     */
    isLastVerticalSlide(): boolean;

    /**
     * Checks if reveal.js has been loaded and is ready for use
     */
    isReady(): boolean;

    /**
     * Forward event binding to the reveal DOM element
     */
    addEventListener(
      type: string,
      listener: () => void,
      useCapture: boolean
    ): void;

    removeEventListener(
      type: string,
      listener: () => void,
      useCapture: boolean
    ): void;

    /**
     * Add a custom key binding with optional description to
     * be added to the help screen.
     */
    addKeyBinding(binding: any, callback: () => void): void;

    /**
     * Removes the specified custom key binding.
     */
    removeKeyBinding(keyCode: string): void;

    /**
     * Registers a new plugin with this reveal.js instance.
     *
     * reveal.js waits for all registered plugins to initialize
     * before considering itself ready, as long as the plugin
     * is registered before calling `Reveal.initialize()`.
     */
    registerPlugin(id: string, plugin: any): void;

    /**
     * Checks if a specific plugin has been registered.
     *
     * @param id Unique plugin identifier
     */
    hasPlugin(id: string): void;

    /**
     * Returns the specific plugin instance, if a plugin
     * with the given ID has been registered.
     *
     * @param id Unique plugin identifier
     */
    getPlugin(id: string): any;

    /**
     * Programmatically triggers a keyboard event
     */
    triggerKey(keyCode: string): void;

    /**
     * Registers a new shortcut to include in the help overlay
     */
    registerKeyboardShortcut(key: string, value: any): void;
  }

  export default Reveal;
}
