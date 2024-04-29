import { isArray, isString } from "@vuepress/helper/client";
import type {
  DASHNamespaceLoader,
  HLSConstructorLoader,
  PlayerSrc,
  PlyrLayoutProps,
  TextTrackInit,
} from "vidstack";
import type { MediaPlayerElement } from "vidstack/elements";
import type { VidstackPlayerConfig } from "vidstack/global/player";
import { PlyrLayout, VidstackPlayer } from "vidstack/global/player";
import type { PropType, VNode } from "vue";
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  shallowRef,
} from "vue";

import { getLink } from "../utils/index.js";

import "vidstack/player/styles/base.css";
import "vidstack/player/styles/plyr/theme.css";
import "../styles/video-player.scss";

declare const DASHJS_INSTALLED: boolean;
declare const HLS_JS_INSTALLED: boolean;

export default defineComponent({
  name: "VideoPlayer",

  props: {
    /**
     * sources
     */
    src: {
      type: [String, Array, Object] as PropType<PlayerSrc>,
      required: true,
    },

    /**
     * tracks
     */
    tracks: { type: Array as PropType<TextTrackInit[]>, default: () => [] },

    /**
     * poster
     */
    poster: {
      type: String,
      default: "",
    },

    /**
     * thumbnails
     */
    thumbnails: {
      type: String,
      default: "",
    },

    /**
     * title
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * VidStack player options
     */
    player: {
      type: Object as PropType<
        Omit<
          VidstackPlayerConfig,
          "target" | "src" | "sources" | "tracks" | "title" | "poster"
        >
      >,

      default: () => ({}),
    },

    /**
     * VidStack layout options
     */
    layout: {
      type: Object as PropType<Partial<PlyrLayoutProps>>,
      default: () => ({}),
    },
  },

  setup(props) {
    const video = shallowRef<HTMLVideoElement>();

    let player: MediaPlayerElement | null = null;

    onMounted(async () => {
      const options: VidstackPlayerConfig = {
        target: video.value!,
        crossOrigin: true,
        poster: props.poster,
        title: props.title,
        ...props.player,
        layout: new PlyrLayout({
          thumbnails: props.thumbnails,
          ...props.layout,
        }),
      };

      options.src = isString(props.src)
        ? getLink(props.src)
        : isArray(props.src)
          ? props.src.map((src) => (isString(src) ? getLink(src) : src))
          : props.src;

      if (props.tracks.length) options.tracks = props.tracks;

      player = await VidstackPlayer.create(options);

      player.addEventListener("provider-change", () => {
        if (player!.provider?.type === "hls" && HLS_JS_INSTALLED)
          player!.provider.library = (() =>
            import(
              /* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js"
            )) as HLSConstructorLoader;
        else if (player!.provider?.type === "dash" && DASHJS_INSTALLED)
          player!.provider.library = (() =>
            import(
              /* webpackChunkName: "dashjs" */ "dashjs"
            )) as DASHNamespaceLoader;
      });
    });

    onBeforeUnmount(() => {
      player?.destroy();
    });

    return (): VNode => h("div", { ref: video });
  },
});
