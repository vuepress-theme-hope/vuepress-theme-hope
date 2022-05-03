export const revealMath = (): Promise<
  typeof import("reveal.js/dist/reveal.esm.js")
> =>
  import(/* webpackChunkName: "reveal" */ "reveal.js/plugin/math/math.esm.js");
