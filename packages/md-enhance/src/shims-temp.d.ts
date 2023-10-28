declare module "@temp/md-enhance/revealjs-plugins.js" {
  import Reveal = require("reveal.js");

  export const useRevealJs: () => [
    Promise<typeof import("reveal.js/dist/reveal.esm.js")>,
    ...Promise<{ default: Reveal.PluginFunction }>[],
  ];
}

declare module "@temp/md-enhance/revealjs-theme.scss" {
  const content: undefined;

  export default content;
}
