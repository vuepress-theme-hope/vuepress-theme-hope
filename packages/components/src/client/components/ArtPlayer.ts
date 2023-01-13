/* eslint-disable vue/no-unused-properties */
import Artplayer from "artplayer";
import { camelize, defineComponent, h, onBeforeUnmount, onMounted } from "vue";
import { deepAssign } from "vuepress-shared/client";

import { useSize } from "../composables/index.js";
import {
  SUPPORTED_VIDEO_TYPES,
  getTypeByUrl,
  registerMseDash,
  registerMseFlv,
  registerMseHls,
} from "../utils/index.js";

import type { Option as ArtPlayerInitOptions } from "artplayer/types/option.js";
import type { PropType, VNode } from "vue";
import type { ArtPlayerOptions } from "../../shared/index.js";

type SupportedAttrs =
  | "airplay"
  | "autoOrientation"
  | "autoPlayback"
  | "fastForward"
  | "fullscreen"
  | "lock"
  | "muted"
  | "miniProgressBar"
  | "playbackRate";

declare const ART_PLAYER_OPTIONS: ArtPlayerOptions;

const artplayerDefaultOptions: ArtPlayerOptions = deepAssign(
  {
    config: {
      fullscreen: true,
      autoSize: true,
      setting: true,
      playbackRate: true,
      whitelist: ["*"],
      muted: false,
    },
  },
  ART_PLAYER_OPTIONS
);

export default defineComponent({
  name: "ArtPlayer",

  props: {
    /**
     * Video Source
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * artplayer src
     */
    config: {
      type: Object as PropType<Omit<ArtPlayerOptions, "container">>,
      default: null,
    },

    /**
     * ArtPlayer src.poster
     */
    poster: {
      type: String,
      default: "",
    },

    /**
     * ArtPlayer src.title
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
     * Customize Artplayer options
     *
     * 对 Artplayer 选项进行自定义
     */
    customPlayerOptions: {
      type: Function as PropType<
        (
          options: ArtPlayerInitOptions
        ) =>
          | ArtPlayerInitOptions
          | void
          | Promise<ArtPlayerInitOptions>
          | Promise<void>
      >,

      default: (options: ArtPlayerInitOptions) => options,
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
    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let artPlayerInstance: Artplayer;

    const getInitOptions = async (): Promise<ArtPlayerInitOptions> => {
      const initOptions: ArtPlayerInitOptions = {
        ...artplayerDefaultOptions,
        container: el.value!,
        title: props.title,
        poster: props.poster,
        url: props.src,
        ...props.config,
      };

      const attrsKeys = Object.keys(attrs);

      [
        "airplay",
        "auto-orientation",
        "auto-playback",
        "fast-forward",
        "lock",
        "muted",
        "mini-progress-bar",
      ].forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[<SupportedAttrs>camelize(config)] = true;
      });

      ["no-fullscreen", "no-playback-rate"].forEach((config) => {
        if (attrsKeys.includes(config))
          initOptions[<SupportedAttrs>camelize(config.replace(/^no-/, ""))] =
            false;
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
        ...((await props.customPlayerOptions(initOptions)) || initOptions),
        // this option must be set true to avoid problems
        useSSR: true,
      };
    };

    onMounted(async () => {
      const initOptions = await getInitOptions();
      const player = new Artplayer(initOptions);

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
