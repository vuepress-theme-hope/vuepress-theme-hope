# VideoPlayer

## Demo

<VideoPlayer
  src="https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.1080p.vp9.webm"
  poster="/poster.svg"
  :tracks="[
    {
      default: true,
      src: $withBase('/en.vtt'),
      kind: 'subtitles',
      label: 'English',
      srcLang: 'en',
    },
    {
      src: $withBase('//fr.vtt'),
      kind: 'subtitles',
      label: 'French',
      srcLang: 'fr',
    },
  ]"
/>
