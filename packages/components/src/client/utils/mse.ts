declare const DASHJS_INSTALLED: boolean;
declare const HLS_JS_INSTALLED: boolean;
declare const MPEGTS_JS_INSTALLED: boolean;

export const SUPPORTED_VIDEO_TYPES = ["mp4", "mp3", "webm", "ogg"];

if (typeof DASHJS_INSTALLED !== "undefined" && DASHJS_INSTALLED)
  SUPPORTED_VIDEO_TYPES.push("mpd", "dash");

if (typeof HLS_JS_INSTALLED !== "undefined" && HLS_JS_INSTALLED)
  SUPPORTED_VIDEO_TYPES.push("m3u8", "hls");

if (typeof MPEGTS_JS_INSTALLED !== "undefined" && MPEGTS_JS_INSTALLED)
  SUPPORTED_VIDEO_TYPES.push("ts", "flv");

export const getTypeByUrl = (url: string): string =>
  url?.split(".").pop() || "";

export const registerMseDash = async (
  mediaElement: HTMLMediaElement,
  src: string,
  onDestroy: (destroy: () => void) => void,
  autoPlay = false,
  startTime = 0,
): Promise<void> => {
  if (typeof DASHJS_INSTALLED !== "undefined" && DASHJS_INSTALLED) {
    const dashjs = (
      await import(/* webpackChunkName: "dashjs" */ "dashjs-pure")
    ).default;

    if (dashjs.supportsMediaSource()) {
      const dashPlayer = dashjs.MediaPlayer().create();

      dashPlayer.initialize(mediaElement, src, autoPlay, startTime);

      onDestroy(() => dashPlayer.destroy());
    }
  }
};

export const registerMseFlv = async (
  mediaElement: HTMLMediaElement,
  src: string,
  onDestroy: (destroy: () => void) => void,
): Promise<void> => {
  if (typeof MPEGTS_JS_INSTALLED !== "undefined" && MPEGTS_JS_INSTALLED) {
    const mpegts = (
      await import(
        /* webpackChunkName: "mpegts.js" */ "mpegts.js/dist/mpegts.js"
      )
    ).default;

    if (mpegts.isSupported()) {
      const flvPlayer = mpegts.createPlayer({
        type: "flv",
        url: src,
      });

      flvPlayer.attachMediaElement(mediaElement);
      flvPlayer.load();

      onDestroy(() => flvPlayer.destroy());
    }
  }
};

export const registerMseHls = async (
  mediaElement: HTMLMediaElement,
  src: string,
  onDestroy: (destroy: () => void) => void,
): Promise<void> => {
  if (
    mediaElement.canPlayType("application/x-mpegURL") ||
    mediaElement.canPlayType("application/vnd.apple.mpegURL")
  ) {
    mediaElement.src = src;
  } else if (typeof HLS_JS_INSTALLED !== "undefined" && HLS_JS_INSTALLED) {
    const hls = (
      await import(/* webpackChunkName: "hls.js" */ "hls.js/dist/hls.min.js")
    ).default;

    if (hls.isSupported()) {
      const hlsInstance = new hls();

      hlsInstance.attachMedia(mediaElement);
      hlsInstance.on(hls.Events.MEDIA_ATTACHED, function () {
        hlsInstance.loadSource(src);
      });

      onDestroy(() => hlsInstance.destroy());
    }
  }
};
