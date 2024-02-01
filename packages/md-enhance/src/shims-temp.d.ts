declare module "@temp/md-enhance/revealjs-plugins.js" {
  import type { PluginFunction } from "reveal.js";

  export const useRevealJs: () => [
    // eslint-disable-next-line @typescript-eslint/consistent-type-imports
    Promise<typeof import("reveal.js/dist/reveal.esm.js")>,
    ...Promise<{ default: PluginFunction }>[],
  ];
}

declare module "@temp/md-enhance/revealjs-theme.scss" {
  const content: undefined;

  export default content;
}
