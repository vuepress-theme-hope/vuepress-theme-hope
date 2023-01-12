export const videoTypes = (
  customTypes: Record<string, unknown>
): Array<string> => {
  return [
    ...["mp4", "mp3", "webm", "ogg"],
    ...["m3u8", "hls", "ts", "flv", "mpd", "dash"],
    ...Object.keys(customTypes),
  ];
};

export const getTypeByUrl = (url: string): string | undefined => {
  if (url) {
    return url.split(".").pop();
  }

  return undefined;
};

export const useMseHls = async (
  mediaElement: HTMLMediaElement,
  src: string,
  registerDestroy: (destroy: () => void) => void
): Promise<void> => {
  const { default: Hls } = await import(
    /* webpackChunkName: "hls.js" */ "hls.js/dist/hls.min.js"
  );

  if (
    mediaElement.canPlayType("application/x-mpegURL") ||
    mediaElement.canPlayType("application/vnd.apple.mpegURL")
  ) {
    mediaElement.src = src;
  } else if (Hls.isSupported()) {
    const hls = new Hls();

    hls.attachMedia(mediaElement);
    hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(src);
    });

    registerDestroy(() => hls.destroy());
  }
};

export const useMseFlv = async (
  mediaElement: HTMLMediaElement,
  src: string,
  registerDestroy: (destroy: () => void) => void
): Promise<void> => {
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

    registerDestroy(() => flvPlayer.destroy());
  }
};

export const useMseDash = async (
  mediaElement: HTMLMediaElement,
  src: string,
  registerDestroy: (destroy: () => void) => void,
  autoPlay = false,
  startTime = 0
): Promise<void> => {
  const { default: dashjs } = await import(
    /* webpackChunkName: "dashjs" */ "dashjs/dist/dash.all.min.js"
  );

  if (dashjs.supportsMediaSource()) {
    const dashPlayer = dashjs.MediaPlayer().create();

    dashPlayer.initialize(mediaElement, src, autoPlay, startTime);

    registerDestroy(() => dashPlayer.destroy());
  }
};
