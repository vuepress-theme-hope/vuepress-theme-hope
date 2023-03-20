import { type App, inject } from "vue";

import { type ArtalkOptions } from "../../shared/index.js";

const artalkSymbol = Symbol("artalk");

let artalkOptions: ArtalkOptions | undefined = undefined;

export const defineArtalkConfig = (options: ArtalkOptions): void => {
  artalkOptions = options;
};

export const setupArtalkConfig = (app: App): void => {
  app.provide(artalkSymbol, artalkOptions);
};

export const useArtalkOptions = (): ArtalkOptions | undefined =>
  inject(artalkSymbol);
