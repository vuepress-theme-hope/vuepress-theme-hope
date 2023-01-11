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
      type: Object as PropType<CustomArtPlayerOptions>,
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
      required: false,
    },

    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: artplayerDefaultOptions?.width,
      required: false,
    },

    /**
     * Component height
     *
     * 组件高度
     */
    height: {
      type: [String, Number],
      default: artplayerDefaultOptions?.height,
      required: false,
    },

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: artplayerDefaultOptions.ratio,
      required: false,
    },
  },

  setup(props) {
    const option = {
      ...deepMerge(artplayerDefaultOptions, props),
    };

    const src: CustomArtPlayerOptions = option.src!;

    src.url = option.url ?? src.url!;
    src.poster = option.poster ?? src.poster!;
    src.title = option.title ?? src.title!;
    src.muted = option.muted ?? src.muted!;

    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let artplayer: ArtPlayer;

    onMounted(async () => {
      const { default: art } = await import(
        /* webpackChunkName: "artplayer"  */ "artplayer/dist/artplayer.js"
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
              customType[src.type] = useMseHls;
              break;
            case "flv":
              customType[src.type] = useMseFlv;
              break;
            case "mpd":
            case "dash":
              customType[src.type] = useMseDash;
              break;
          }

          src.customType = {
            ...customType,
            ...src.customType,
          };
        } else {
          // throw warning???
        }
      }

      // config danmaku plugin
      if (props.pluginDanmuKu) {
        const { default: artplayerPluginDanmuku } = await import(
          /* webpackChunkName: "artplayer-plugin-danmuku"  */ "artplayer-plugin-danmuku"
        );

        // @ts-ignore
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
