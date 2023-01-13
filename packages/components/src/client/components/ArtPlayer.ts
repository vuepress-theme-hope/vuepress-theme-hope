/* eslint-disable vue/no-unused-properties */
import { usePageLang } from "@vuepress/client";
import Artplayer from "artplayer";
import { camelize, defineComponent, h, onBeforeUnmount, onMounted } from "vue";

import { useSize } from "../composables/size.js";
import {
  SUPPORTED_VIDEO_TYPES,
  getTypeByUrl,
  registerMseDash,
  registerMseFlv,
  registerMseHls,
} from "../utils/mse.js";

import type { Option as ArtPlayerInitOptions } from "artplayer/types/option.js";
import type { PropType, VNode } from "vue";
import type { ArtPlayerOptions } from "../../shared/index.js";

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

const SUPPORTED_LANG_NAME = ["en", "pl", "cs", "es", "fa"];
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

type RemoveNo<S extends string> = S extends `no-${infer Key}`
  ? KebabCaseToCamelCase<Key>
  : never;

type ArtPlayerBooleanOptionKey =
  | (typeof BOOLEAN_TRUE_ATTRS extends readonly (infer T extends string)[]
      ? RemoveNo<T>
      : never)
  | (typeof BOOLEAN_FALSE_ATTRS extends readonly (infer T extends string)[]
      ? KebabCaseToCamelCase<T>
      : never);

declare const ART_PLAYER_OPTIONS: ArtPlayerOptions;

const getLang = (lang: string): string => {
  const langCode = lang.toLowerCase();
  const langName = lang.split("-")[0]!;

  return SUPPORTED_LANG_NAME.includes(langName)
    ? langName
    : SUPPORTED_LANG_CODE.includes(langCode)
    ? langCode
    : langCode === "zh"
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
        title: props.title,
        poster: props.poster,
        url: props.src,
      };

      const attrsKeys = Object.keys(attrs);

      BOOLEAN_FALSE_ATTRS.forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[<ArtPlayerBooleanOptionKey>camelize(config)] = true;
      });

      ["no-fullscreen", "no-playback-rate"].forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[
            <ArtPlayerBooleanOptionKey>camelize(config.replace(/^no-/, ""))
          ] = false;
      });

      initOptions.type ??= getTypeByUrl(initOptions.url);

      // auto config mse
      if (initOptions.type) {
        const customType = (initOptions.customType ??= {});

        if (SUPPORTED_VIDEO_TYPES.includes(initOptions.type.toLowerCase())) {
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
        } else
          console.warn(
            `[components]: ArtPlayer does not support current file type ${initOptions.type}!`
          );
      }

      return {
        ...initOptions,
        ...props.config,
        lang: getLang(lang.value),
        // this option must be set true to avoid problems
        useSSR: true,
      };
    };

    onMounted(async () => {
      const player = new Artplayer(getInitOptions());

      artPlayerInstance = (await props.customPlayer(player)) || player;
    });

    onBeforeUnmount(() => {
      artPlayerInstance?.destroy();
    });

    return (): VNode =>
      h("div", {
        ref: el,
        style: {
          width: width.value,
          height: height.value,
        },
        innerHTML: Artplayer.html,
      });
  },
});
