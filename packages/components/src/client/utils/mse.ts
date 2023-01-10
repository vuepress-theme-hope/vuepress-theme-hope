/* eslint-disable @typescript-eslint/no-unsafe-call */

export const autoType = (url: string): string | undefined => {
  if (url) {
    switch (true) {
      case url.endsWith(".m3u8"):
        return "m3u8";
      case url.endsWith(".flv"):
        return "flv";
      case url.endsWith(".mpd"):
        return "mpd";
      default:
        return "mp4";
    }
  }

  return undefined;
};

export const Hls = async () => {
  const { default: Hls } = await import("hls.js/dist/hls.min.js");

  return Hls;
};

export const MpegTs = async () => {
  const { default: mpegts } = await import("mpegts.js/dist/mpegts.js");

  return mpegts;
};

export const Dash = async () => {
  const { default: dashjs } = await import("dashjs/dist/dash.all.min.js");

  return dashjs;
};

export const m3u8 = async (
  mediaElement: HTMLMediaElement,
  src: string,
  player: any,
  onDestroy = "destroy"
) => {
  const hlsjs = await Hls();

  if (
    mediaElement.canPlayType("application/x-mpegURL") ||
    mediaElement.canPlayType("application/vnd.apple.mpegURL")
  ) {
    mediaElement.src = src;
  } else if (hlsjs.isSupported()) {
    const hls = new hlsjs();

    hls.attachMedia(mediaElement);
    hls.on(hlsjs.Events.MEDIA_ATTACHED, function () {
      hls.loadSource(src);
    });

    player?.on(onDestroy, function () {
      hls.destroy();
    });

    return hls;
  }

  return undefined;
};

export const flv = async (
  mediaElement: HTMLMediaElement,
  src: string,
  player: any,
  onDestroy = "destroy"
) => {
  const mpegts = await MpegTs();

  if (mpegts.isSupported()) {
    const flvPlayer = mpegts.createPlayer({
      type: "flv",
      url: src,
    });

    flvPlayer.attachMediaElement(mediaElement);
    flvPlayer.load();

    player?.on(onDestroy, function () {
      flvPlayer.destroy();
    });

    return flvPlayer;
  }

  return undefined;
};

export const mpd = async (
  mediaElement: HTMLMediaElement,
  src: string,
  player: any,
  onDestroy = "destroy",
  autoPlay = false,
  startTime = 0
) => {
  const dashjs = await Dash();

  if (dashjs.supportsMediaSource()) {
    const dashPlayer = dashjs.MediaPlayer().create();

    dashPlayer.initialize(mediaElement, src, autoPlay, startTime);

    player?.on(onDestroy, function () {
      dashPlayer.destroy();
    });

    return dashPlayer;
  }

  return undefined;
};
