declare module "@temp/md-enhance/revealjs-plugins.js" {
  export const useRevealJs: () => Promise<
    typeof import("reveal.js/dist/reveal.esm.js")
  >[];
}

declare module "@temp/md-enhance/revealjs-theme.scss" {
  const content: undefined;

  export default content;
}
