/* eslint-disable vue/no-unused-properties */
import { PropType, defineComponent, h, onBeforeUnmount, onMounted } from "vue";
import { deepMerge } from "vuepress-shared/client";
import { useSize } from "../composables/index.js";
import { autoType, flv, m3u8, mpd } from "../utils/index.js";

import type { VNode } from "vue";

import type {
  ArtPlayer,
  ArtPlayerOptions,
  ComponentsArtPlayerOptions,
  CustomArtPlayerOptions,
} from "../../shared/index.js";

declare const ART_PLAYER: ComponentsArtPlayerOptions;

const optionsDefault = {
  width: "100%",
  ratio: 16 / 9,
  src: {
    fullscreen: true,
    autoSize: true,
    setting: true,
    whitelist: ["*"],
  },
};

export default defineComponent({
  name: "ArtPlayer",

  props: {
    /**
     * artplayer src
     */
    src: {
      type: Object as PropType<CustomArtPlayerOptions>,
      default: optionsDefault.src,
      required: false,
    },

    /**
     * artplayer src.url
     */
    url: {
      type: String,
      default: "",
      required: false,
    },

    /**
     * artplayer src.poster
     */
    poster: {
      type: String,
      default: "",
      required: false,
    },

    /**
     * artplayer src.title
     */
    title: {
      type: String,
      default: "",
      required: false,
    },

    /**
     * artplayer src.muted
     */
    muted: {
      type: Boolean,
      default: false,
      required: false,
    },

    /**
     *  return artplayer
     */
    player: {
      type: Function,
      default: undefined,
      required: false,
    },

    /**
     * artplayer danmuku
     */
    pluginDanmuKu: {
      type: Object,
      default: () => ART_PLAYER.pluginDanmuKu || {},
      required: false,
    },

    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: ART_PLAYER?.width || optionsDefault.width || undefined,
      required: false,
    },

    /**
     * Component height
     *
     * 组件高度
     */
    height: {
      type: [String, Number],
      default: ART_PLAYER?.height || undefined,
      required: false,
    },

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: ART_PLAYER?.ratio || optionsDefault.ratio || undefined,
      required: false,
    },
  },

  setup(props) {
    const option = {
      ...deepMerge(ART_PLAYER, props),
    };

    option.src ??= {};

    const src = {
      ...deepMerge(optionsDefault.src, option.src),
    };

    src.url = option.url ?? src.url ?? "";
    src.poster = option.poster ?? src.poster ?? "";
    src.title = option.title ?? src.title ?? "";
    src.muted = option.muted ?? src.muted ?? false;

    const { el, width, height } = useSize<HTMLDivElement>(props, 0);

    let artplayer: ArtPlayer;

    const initArtPlayer = async (): Promise<void> => {
      const { default: art } = await import("artplayer/dist/artplayer.js");

      src.container = el.value!;
      src.customType ??= {};
      src.type ??= autoType(src.url!) || "";

      if (src.type) {
        switch (src.type) {
          case "m3u8":
          case "hls":
            src.customType[src.type] = m3u8;
            break;
          case "flv":
            src.customType[src.type] = flv;
            break;
          case "mpd":
          case "dash":
            src.customType[src.type] = mpd;
            break;
        }
      }

      if (props.pluginDanmuKu) {
        const { default: artplayerPluginDanmuku } = await import(
          "artplayer-plugin-danmuku"
        );

        src.plugins ??= [];
        // @ts-ignore
        src.plugins?.push(artplayerPluginDanmuku(option.pluginDanmuKu));
      }

      artplayer = new art(src as ArtPlayerOptions);

      if (props.player) {
        props.player(artplayer);
      }
    };

    const destroyArtPlayer = (): void => {
      artplayer.destroy();
    };

    onMounted(async () => {
      await initArtPlayer();
    });
    onBeforeUnmount(() => {
      destroyArtPlayer();
    });

    return (): VNode[] => [
      h("div", {
        ref: el,
        style: {
          width: width.value,
          height: height.value,
        },
      }),
    ];
  },
});
