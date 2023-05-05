import { type App, inject } from "vue";

import {
  type ArtalkOptions,
  type CommentOptions,
  type GiscusOptions,
  type TwikooOptions,
  type WalineOptions,
} from "../../shared/index.js";

declare const __VUEPRESS_DEV__: boolean;
declare const COMMENT_OPTIONS: CommentOptions;

const commentOptions = COMMENT_OPTIONS;

let comment: CommentOptions = commentOptions;

const commentSymbol = Symbol(__VUEPRESS_DEV__ ? "comment" : "");

const defineCommentConfig = <T extends CommentOptions>(options: T): void => {
  comment = { ...commentOptions, ...options };
};

export const useCommentOptions = <T extends CommentOptions>(): T =>
  inject(commentSymbol)!;

export const defineArtalkConfig = defineCommentConfig<ArtalkOptions>;

export const useArtalkOptions = useCommentOptions<ArtalkOptions>;

export const defineGiscusConfig = defineCommentConfig<GiscusOptions>;

export const useGiscusOptions = useCommentOptions<GiscusOptions>;

export const defineTwikooConfig = defineCommentConfig<TwikooOptions>;

export const useTwikooOptions = useCommentOptions<TwikooOptions>;

export const defineWalineConfig = defineCommentConfig<WalineOptions>;

export const useWalineOptions = useCommentOptions<WalineOptions>;

export const injectCommentConfig = (app: App): void => {
  app.provide(commentSymbol, comment);
};
