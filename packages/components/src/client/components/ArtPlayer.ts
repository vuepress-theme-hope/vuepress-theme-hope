/* eslint-disable vue/no-unused-properties */
/* eslint-disable vue/require-default-prop */
import { PropType, defineComponent, h, onBeforeUnmount, onMounted } from "vue";
import { deepMerge } from "vuepress-shared/client";
import { useSize } from "../composables/index.js";
import {
  getTypeByUrl,
  useMseDash,
  useMseFlv,
  useMseHls,
  videoTypes,
} from "../utils/index.js";

import type { Option as ArtPlayerPluginDanmukuOption } from "artplayer-plugin-danmuku";
import type { VNode } from "vue";
import type {
  ArtPlayer,
  ArtPlayerOptions,
  ComponentsArtPlayerOptions,
  CustomArtPlayerOptions,
} from "../../shared/index.js";

declare const ART_PLAYER_OPTIONS: ComponentsArtPlayerOptions;

const artplayerDefaultOptions = deepMerge(
  {
    width: "100%",
    ratio: 16 / 9,
    src: {
      fullscreen: true,
      autoSize: true,
      setting: true,
      playbackRate: true,
      whitelist: ["*"],
      title: "",
      poster: "",
      muted: false,
    },
  },
  ART_PLAYER_OPTIONS
);

export default defineComponent({
  name: "ArtPlayer",

  props: {
    /**
     * artplayer src
     */
    src: {
      type: Object as PropType<Omit<CustomArtPlayerOptions, "container">>,
      default: artplayerDefaultOptions.src,
      required: false,
    },

    /**
     * artplayer src.url
     */
    url: String,

    /**
     * artplayer src.poster
     */
    poster: String,

    /**
     * artplayer src.title
     */
    title: String,

    /**
     * artplayer src.muted
     */
    muted: {
      type: Boolean,
      // eslint-disable-next-line vue/no-boolean-default
      default: undefined,
    },

    /**
     *  return artplayer
     */
    player: Function,

    /**
     * artplayer danmuku plugin
     */
    pluginDanmuKu: {
      type: Object as PropType<ArtPlayerPluginDanmukuOption>,
      default: () => artplayerDefaultOptions.pluginDanmuKu,
    },

    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: artplayerDefaultOptions?.width,
    },

    /**
     * Component height
     *
     * 组件高度
     */
    height: {
      type: [String, Number],
      default: artplayerDefaultOptions?.height,
    },

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: artplayerDefaultOptions.ratio,
    },
  },

  setup(props) {
    const option = {
      ...deepMerge(artplayerDefaultOptions, props),
    };

    const src: CustomArtPlayerOptions = {
      ...option.src,
      url: option.url ?? option.src!.url!,
      poster: option.poster ?? option.src!.poster,
      title: option.title ?? option.src!.title,
      muted: option.muted ?? option.src!.muted,
    };

    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let artplayer: ArtPlayer;

    onMounted(async () => {
      const { default: art } = await import(
        /* webpackChunkName: "artplayer" */ "artplayer/dist/artplayer.js"
      );

      src.container = el.value!;
      src.type ??= getTypeByUrl(src.url!) ?? "";

      // auto config mse
      if (src.type) {
        const customType: Record<string, unknown> = {};

        if (videoTypes(customType).includes(src.type.toLowerCase())) {
          switch (src.type) {
            case "m3u8":
            case "hls":
              customType[src.type] = (
                video: HTMLVideoElement,
                src: string,
                player: ArtPlayer
              ): Promise<unknown> =>
                useMseHls(video, src, (d) => {
                  player.on("destroy", d);
                });
              break;
            case "flv":
              customType[src.type] = (
                video: HTMLVideoElement,
                src: string,
                player: ArtPlayer
              ): Promise<unknown> =>
                useMseFlv(video, src, (d) => {
                  player.on("destroy", d);
                });
              break;
            case "mpd":
            case "dash":
              customType[src.type] = customType[src.type] = (
                video: HTMLVideoElement,
                src: string,
                player: ArtPlayer
              ): Promise<unknown> =>
                useMseDash(video, src, (d) => {
                  player.on("destroy", d);
                });
              break;
          }

          src.customType = src.customType
            ? deepMerge(src.customType, customType)
            : customType;
        } else {
          // throw warning ???
        }
      }

      // config danmaku plugin
      if (option?.pluginDanmuKu?.danmuku) {
        const { default: artplayerPluginDanmuku } = await import(
          /* webpackChunkName: "artplayer-plugin-danmuku" */ "artplayer-plugin-danmuku"
        );

        (src.plugins ??= []).push(artplayerPluginDanmuku(option.pluginDanmuKu));
      }

      artplayer = new art(src as ArtPlayerOptions);

      if (props.player) {
        props.player(artplayer);
      }
    });

    onBeforeUnmount(() => {
      artplayer?.destroy();
    });

    return (): VNode =>
      h("div", {
        ref: el,
        style: {
          width: width.value,
          height: height.value,
        },
      });
  },
});
