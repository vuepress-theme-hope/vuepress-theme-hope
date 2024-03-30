# VidStack

## Demo

A video player:

<VidStack
  src="https://media-files.vidstack.io/720p.mp4"
  poster="https://media-files.vidstack.io/poster-2.png"
/>

A video player with poster and tracks:

<VidStack
  src="https://media-files.vidstack.io/720p.mp4"
  title="Agent 327 Operation Barber Shop"
  poster="https://media-files.vidstack.io/poster-2.png"
  :sourses="[
    {
      src: 'https://media-files.vidstack.io/720p.mp4',
      type: 'video/mp4',
    },
    {
      src:  'https://media-files.vidstack.io/720p.avi',
      type: 'video/avi',
    },
    {
      src:  'https://media-files.vidstack.io/720p.ogv',
      type: 'video/ogg',
    },
  ]"
  :tracks="[
    {
      src: 'https://media-files.vidstack.io/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://media-files.vidstack.io/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://media-files.vidstack.io/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://media-files.vidstack.io/thumbnails.vtt"
  crossorigin
/>

HLS:

<VidStack src="https://mse-demo.u2sb.com/dash/master.m3u8" />

An audio player:

<VidStack
  src="//theme-hope-assets.vuejs.press/files/sample.mp3"
  title="VidStack Audio Demo"
/>

A YouTube player

<VidStack
  src="youtube/_cMxraX_5RE"
  title="VidStack YouTube Demo"
/>
