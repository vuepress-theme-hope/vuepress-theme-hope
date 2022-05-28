export const reveal = (): Promise<
  typeof import("reveal.js/dist/reveal.esm.js")
> => import(/* webpackChunkName: "reveal" */ "reveal.js/dist/reveal.esm.js");
