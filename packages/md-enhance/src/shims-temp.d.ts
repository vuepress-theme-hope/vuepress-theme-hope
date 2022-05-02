declare module "@temp/md-enhance/reveal" {
  export const useReveal: () => Promise<
    typeof import("reveal.js/dist/reveal.esm.js")
  >[];
}
