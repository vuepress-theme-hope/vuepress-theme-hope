export const revealSearch = (): Promise<
  typeof import("reveal.js/dist/reveal.esm.js")
> =>
  import(
    /* webpackChunkName: "reveal" */ "reveal.js/plugin/search/search.esm.js"
  );
