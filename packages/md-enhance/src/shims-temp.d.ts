declare module "@temp/md-enhance/reveal-plugins" {
  export const usePlugins: () => Promise<
    typeof import("reveal.js/dist/reveal.esm.js")
  >[];
}
