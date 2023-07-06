export const SUPPORTED_VIDEO_TYPES = [
  "mp4",
  "mp3",
  "webm",
  "ogg",
  "m3u8",
  "hls",
  "ts",
  "flv",
  "mpd",
  "dash",
];

export const getTypeByUrl = (url: string): string =>
  url?.split(".").pop() || "";

export const registerMseDash = async (
  mediaElement: HTMLMediaElement,
  src: string,
  registerDestroy: (destroy: () => void) => void,
  autoPlay = false,
  startTime = 0,
): Promise<void> => {
  const dashjs = (
    await import(/* webpackChunkName: "dashjs" */ "dashjs/dist/dash.all.min.js")
  ).default;

  if (dashjs.supportsMediaSource()) {
    const dashPlayer = dashjs.MediaPlayer().create();

    dashPlayer.initialize(mediaElement, src, autoPlay, startTime);

    registerDestroy(() => dashPlayer.destroy());
  }
};

export const registerMseFlv = async (
  mediaElement: HTMLMediaElement,
  src: string,
  registerDestroy: (destroy: () => void) => void,
): Promise<void> => {
  const mpegts = (
    await import(/* webpackChunkName: "mpegts.js" */ "mpegts.js/dist/mpegts.js")
  ).default;

  if (mpegts.isSupported()) {
    const flvPlayer = mpegts.createPlayer({
      type: "flv",
      url: src,
    });

    flvPlayer.attachMediaElement(mediaElement);
    flvPlayer.load();

    registerDestroy(() => flvPlayer.destroy());
  }
};

export const registerMseHls = async (
  mediaElement: HTMLMediaElement,
  src: string,
  registerDestroy: (destroy: () => void) => void,
): Promise<void> => {
  const hls = (
    await import(/* webpackChunkName: "hls.js" */ "hls.js/dist/hls.min.js")
  ).default;

  if (
    mediaElement.canPlayType("application/x-mpegURL") ||
    mediaElement.canPlayType("application/vnd.apple.mpegURL")
  ) {
    mediaElement.src = src;
  } else if (hls.isSupported()) {
    const hlsInstance = new hls();

    hlsInstance.attachMedia(mediaElement);
    hlsInstance.on(hls.Events.MEDIA_ATTACHED, function () {
      hlsInstance.loadSource(src);
    });

    registerDestroy(() => hlsInstance.destroy());
  }
};
