export const revealNotes = (): Promise<
  typeof import("reveal.js/dist/reveal.esm.js")
> =>
  import(
    /* webpackChunkName: "reveal" */ "reveal.js/plugin/notes/notes.esm.js"
  );
