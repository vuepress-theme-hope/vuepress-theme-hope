declare const DASHJS_INSTALLED: boolean;
declare const HLS_JS_INSTALLED: boolean;
declare const MPEGTS_JS_INSTALLED: boolean;

export const SUPPORTED_VIDEO_TYPES = ["mp4", "mp3", "webm", "ogg"];

const isDashjsInstalled =
  typeof DASHJS_INSTALLED === "boolean" && DASHJS_INSTALLED;
const isHlsJsInstalled =
  typeof HLS_JS_INSTALLED === "boolean" && HLS_JS_INSTALLED;
const isMpegtsJsInstalled =
  typeof MPEGTS_JS_INSTALLED === "boolean" && MPEGTS_JS_INSTALLED;

if (isDashjsInstalled) SUPPORTED_VIDEO_TYPES.push("mpd", "dash");
if (isHlsJsInstalled) SUPPORTED_VIDEO_TYPES.push("m3u8", "hls");

if (isMpegtsJsInstalled) SUPPORTED_VIDEO_TYPES.push("ts", "flv");

export const getTypeByUrl = (url: string): string => url.split(".").pop() ?? "";

export interface DashOptions {
  /**
   * Whether to auto play after initialization
   *
   * @default false
   */
  autoPlay?: boolean;

  /**
   * Starting time in seconds
   *
   * @default 0
   */
  startTime?: number;
}

export const registerMseDash = async (
  mediaElement: HTMLMediaElement,
  src: string,
  onDestroy: (destroy: () => void) => void,
  { autoPlay = false, startTime = 0 }: DashOptions = {},
): Promise<void> => {
  if (__VUEPRESS_SSR__) return;

  if (isDashjsInstalled) {
    const { default: dashjs } = await import(
      /* webpackChunkName: "dashjs" */ "dashjs"
    );

    if (dashjs.supportsMediaSource()) {
      // oxlint-disable-next-line new-cap
      const dashPlayer = dashjs.MediaPlayer().create();

      dashPlayer.initialize(mediaElement, src, autoPlay, startTime);

      onDestroy(() => {
        dashPlayer.destroy();
      });
    }
  }
};

export const registerMseFlv = async (
  mediaElement: HTMLMediaElement,
  src: string,
  onDestroy: (destroy: () => void) => void,
): Promise<void> => {
  if (__VUEPRESS_SSR__) return;

  if (isMpegtsJsInstalled) {
    const { default: mpegts } = await import(
      /* webpackChunkName: "mpegts.js" */ "mpegts.js/dist/mpegts.js"
    );

    if (mpegts.isSupported()) {
      const flvPlayer = mpegts.createPlayer({
        type: "flv",
        url: src,
      });

      flvPlayer.attachMediaElement(mediaElement);
      flvPlayer.load();

      onDestroy(() => {
        flvPlayer.destroy();
      });
    }
  }
};

export const registerMseHls = async (
  mediaElement: HTMLMediaElement,
  src: string,
  onDestroy: (destroy: () => void) => void,
): Promise<void> => {
  if (__VUEPRESS_SSR__) return;

  if (
    mediaElement.canPlayType("application/x-mpegURL") ||
    mediaElement.canPlayType("application/vnd.apple.mpegURL")
  ) {
    mediaElement.src = src;
  } else if (isHlsJsInstalled) {
    const { default: HLS } = await import(
      /* webpackChunkName: "hls.js" */ "hls.js/dist/hls.min.js"
    );

    if (HLS.isSupported()) {
      const hlsInstance = new HLS();

      hlsInstance.attachMedia(mediaElement);
      hlsInstance.on(HLS.Events.MEDIA_ATTACHED, () => {
        hlsInstance.loadSource(src);
      });

      onDestroy(() => {
        hlsInstance.destroy();
      });
    }
  }
};
