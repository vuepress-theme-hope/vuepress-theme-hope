/* eslint-disable vue/no-unused-properties */
import { usePageLang } from "@vuepress/client";
import type Artplayer from "artplayer";
import { type Option as ArtPlayerInitOptions } from "artplayer/types/option.js";
import {
  type PropType,
  type VNode,
  camelize,
  defineComponent,
  h,
  onMounted,
  onUnmounted,
} from "vue";
import { keys } from "vuepress-shared/client";

import { type ArtPlayerOptions } from "../../shared/index.js";
import { useSize } from "../composables/index.js";
import {
  SUPPORTED_VIDEO_TYPES,
  getTypeByUrl,
  registerMseDash,
  registerMseFlv,
  registerMseHls,
} from "../utils/mse.js";

const BOOLEAN_TRUE_ATTRS = [
  "no-fullscreen",
  "no-hotkey",
  "no-playback-rate",
  "no-setting",
  "no-mutex",
  "no-plays-inline",
] as const;

const BOOLEAN_FALSE_ATTRS = [
  "airplay",
  "autoplay",
  "aspect-ratio",
  "auto-mini",
  "auto-size",
  "auto-orientation",
  "auto-playback",
  "fast-forward",
  "flip",
  "fullscreen-web",
  "lock",
  "loop",
  "is-live",
  "muted",
  "mini-progress-bar",
  "pip",
  "screenshot",
  "subtitle-offset",
] as const;

// NOTE: This should be updated with https://github.com/zhw2590582/ArtPlayer/blob/master/packages/artplayer/src/i18n/index.js
const SUPPORTED_LANG_NAME = ["en", "pl", "cs", "es", "fa", "fr", "id", "ru"];
const SUPPORTED_LANG_CODE = ["zh-cn", "zh-tw"];

type KebabCaseToCamelCase<
  S extends string,
  Cap extends boolean = false
> = S extends `${infer Head}-${infer Tail}`
  ? `${Cap extends true ? Capitalize<Head> : Head}${KebabCaseToCamelCase<
      Tail,
      true
    >}`
  : Cap extends true
  ? Capitalize<S>
  : S;

type ArtPlayerBooleanOptionKey =
  | (typeof BOOLEAN_TRUE_ATTRS extends readonly (infer T extends string)[]
      ? T extends `no-${infer Key}`
        ? KebabCaseToCamelCase<Key>
        : never
      : never)
  | (typeof BOOLEAN_FALSE_ATTRS extends readonly (infer T extends string)[]
      ? KebabCaseToCamelCase<T>
      : never);

declare const ART_PLAYER_OPTIONS: ArtPlayerOptions;

const getLang = (lang: string): string => {
  const langCode = lang.toLowerCase();
  const langName = langCode.split("-")[0]!;

  return SUPPORTED_LANG_CODE.includes(langCode)
    ? langCode
    : SUPPORTED_LANG_NAME.includes(langName)
    ? langName
    : langName === "zh"
    ? "zh-cn"
    : "en";
};

export default defineComponent({
  name: "ArtPlayer",

  props: {
    /**
     * Video Source URL
     *
     * 视频源文件地址
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Video Type
     *
     * 视频类型
     */
    type: {
      type: String,
      default: "",
    },

    /**
     * Video poster
     *
     * 视频封面
     */
    poster: {
      type: String,
      default: "",
    },

    /**
     * Video title
     *
     * 视频标题
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: "100%",
    },

    /**
     * Component height
     *
     * 组件高度
     */
    height: {
      type: [String, Number],
      default: undefined,
    },

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: 16 / 9,
    },

    /**
     * ArtPlayer config
     *
     * ArtPlayer 配置
     */
    config: {
      type: Object as PropType<Omit<ArtPlayerOptions, "container">>,
      default: null,
    },

    /**
     * Customize Artplayer
     *
     * 对 Artplayer 进行自定义
     */
    customPlayer: {
      type: Function as PropType<
        (
          player: Artplayer
        ) => Artplayer | void | Promise<Artplayer> | Promise<void>
      >,

      default: (player: Artplayer) => player,
    },
  },

  setup(props, { attrs }) {
    const lang = usePageLang();
    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let artPlayerInstance: Artplayer;

    const getInitOptions = (): ArtPlayerInitOptions => {
      const initOptions: ArtPlayerInitOptions = {
        theme: "#3eaf7c",
        ...ART_PLAYER_OPTIONS,
        container: el.value!,
        poster: props.poster,
        url: props.src,
        type: props.type || getTypeByUrl(props.src),
        lang: getLang(lang.value),
        ...props.config,
        // this option must be set false to avoid problems
        useSSR: false,
      };

      const attrsKeys = keys(attrs);

      BOOLEAN_TRUE_ATTRS.forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[
            <ArtPlayerBooleanOptionKey>camelize(config.replace(/^no-/, ""))
          ] = false;
      });
      BOOLEAN_FALSE_ATTRS.forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[<ArtPlayerBooleanOptionKey>camelize(config)] = true;
      });

      // auto config mse
      if (initOptions.type) {
        const customType = (initOptions.customType ??= {});

        if (SUPPORTED_VIDEO_TYPES.includes(initOptions.type.toLowerCase()))
          switch (initOptions.type) {
            case "m3u8":
            case "hls":
              customType[initOptions.type] ??= (
                video: HTMLVideoElement,
                src: string,
                player: Artplayer
              ): Promise<void> =>
                registerMseHls(video, src, (destroy) => {
                  player.on("destroy", destroy);
                });
              break;

            case "flv":
              customType[initOptions.type] ??= (
                video: HTMLVideoElement,
                src: string,
                player: Artplayer
              ): Promise<void> =>
                registerMseFlv(video, src, (destroy) => {
                  player.on("destroy", destroy);
                });
              break;

            case "mpd":
            case "dash":
              customType[initOptions.type] ??= (
                video: HTMLVideoElement,
                src: string,
                player: Artplayer
              ): Promise<void> =>
                registerMseDash(video, src, (destroy) => {
                  player.on("destroy", destroy);
                });
              break;
          }
        else
          console.warn(
            `[components]: ArtPlayer does not support current file type ${initOptions.type}!`
          );
      }

      return initOptions;
    };

    // FIXME: Related issue https://github.com/zhw2590582/ArtPlayer/issues/450
    onMounted(async () => {
      const { default: Artplayer } = await import(
        /* webpackChunkName: "artplayer" */ "artplayer"
      );
      const player = new Artplayer(getInitOptions());

      artPlayerInstance = (await props.customPlayer(player)) || player;
    });

    onUnmounted(() => {
      artPlayerInstance?.destroy();
    });

    return (): VNode =>
      h(
        "div",
        {
          ref: el,
          style: {
            width: width.value,
            height: height.value,
          },
        },
        "Loading..."
      );
  },
});
