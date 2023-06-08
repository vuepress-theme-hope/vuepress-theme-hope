# VidStack

::: warning

VidStack has some known issues with Vue. So stop using it until we fixed it.

:::

## Demo

A video player:

<VidStack src="https://vp-demo.u2sb.com/video/caminandes_03_llamigos_720p.mp4" />

A video player with poster and tracks:

<VidStack
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  title="VidStack video"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: '/en.vtt',
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: '//fr.vtt',
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>

HLS:

<VidStack src="https://mse-demo.u2sb.com/dash/master.m3u8" />

## An audio player

<VidStack
  src="/sample.mp3"
  title="A Sample Audio"
/>
