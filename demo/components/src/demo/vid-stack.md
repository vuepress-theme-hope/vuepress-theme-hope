# VidStack

## Demo

A basic video player:

<VidStack
  src="https://files.vidstack.io/sprite-fight/720p.mp4"
  poster="https://files.vidstack.io/sprite-fight/poster.webp"
/>

A video player with poster, tracks, subtitles, chapters and thumbnails:

<VidStack
  title="Agent 327 Operation Barber Shop"
  poster="https://files.vidstack.io/agent-327/poster.png"
  :src="[
    {
      src: 'https://files.vidstack.io/agent-327/720p.mp4',
      type: 'video/mp4',
      width: 1280,
      height: 720,
    },
    {
      src:  'https://files.vidstack.io/agent-327/720p.avi',
      type: 'video/avi',
      width: 1280,
      height: 720,
    },
    {
      src:  'https://files.vidstack.io/agent-327/720p.ogv',
      type: 'video/ogg',
      width: 1280,
      height: 720,
    },
  ]"
  :tracks="[
    {
      src: 'https://files.vidstack.io/agent-327/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/french.vtt',
      label: 'French',
      language: 'fr-FR',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/german.vtt',
      label: 'German',
      language: 'ge-GE',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/italian.vtt',
      label: 'Italian',
      language: 'it-IT',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/russian.vtt',
      label: 'Russian',
      language: 'ru-RU',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://files.vidstack.io/agent-327/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://files.vidstack.io/agent-327/thumbnails.vtt"
/>

HLS:

<VidStack
  src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8"
  :tracks="[
    {
      src: 'https://files.vidstack.io/agent-327/subs/english.vtt',
      label: 'English',
      language: 'en-US',
      kind: 'subtitles',
      default: true,
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/spanish.vtt',
      label: 'Spanish',
      language: 'es-ES',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/french.vtt',
      label: 'French',
      language: 'fr-FR',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/german.vtt',
      label: 'German',
      language: 'ge-GE',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/italian.vtt',
      label: 'Italian',
      language: 'it-IT',
      kind: 'subtitles',
    },
    {
      src: 'https://files.vidstack.io/agent-327/subs/russian.vtt',
      label: 'Russian',
      language: 'ru-RU',
      kind: 'subtitles',
    },
    // Chapters
    {
      src: 'https://files.vidstack.io/agent-327/chapters.vtt',
      kind: 'chapters',
      language: 'en-US',
      default: true,
    },
  ]"
  thumbnails="https://files.vidstack.io/agent-327/thumbnails.vtt"
/>

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
