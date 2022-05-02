export const revealZoom = (): Promise<
  typeof import("reveal.js/dist/reveal.esm.js")
> =>
  import(/* webpackChunkName: "reveal" */ "reveal.js/plugin/zoom/zoom.esm.js");
