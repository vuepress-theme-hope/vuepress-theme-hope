import type { ExactLocaleConfig } from "@vuepress/helper/client";
import { isArray, isString, useLocaleConfig } from "@vuepress/helper/client";
import type {
  DASHNamespaceLoader,
  DefaultLayoutProps,
  HLSConstructorLoader,
  PlayerSrc,
  TextTrackInit,
} from "vidstack";
import type { MediaPlayerElement } from "vidstack/elements";
import type { VidstackPlayerConfig } from "vidstack/global/player";
import { VidstackPlayer, VidstackPlayerLayout } from "vidstack/global/player";
import type { PropType, VNode } from "vue";
import {
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  shallowRef,
} from "vue";

import type { VidstackLocaleData } from "../../shared/index.js";
import { getLink } from "../utils/getLink.js";

import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/audio.css";
import "vidstack/player/styles/default/layouts/video.css";
import "../styles/vidstack.scss";

declare const DASHJS_INSTALLED: boolean;
declare const HLS_JS_INSTALLED: boolean;
declare const VIDSTACK_LOCALES: ExactLocaleConfig<VidstackLocaleData>;

export default defineComponent({
  name: "VidStack",

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
    poster: String,

    /**
     * thumbnails
     */
    thumbnails: String,

    /**
     * title
     */
    title: String,

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
    },

    /**
     * VidStack layout options
     */
    layout: {
      type: Object as PropType<Partial<DefaultLayoutProps>>,
    },

    /**
     * Dark mode
     */
    darkmode: Boolean,
  },

  setup(props) {
    const vidstack = shallowRef<HTMLElement>();
    const locale = useLocaleConfig(VIDSTACK_LOCALES);

    let player: MediaPlayerElement | null = null;

    onMounted(async () => {
      if (__VUEPRESS_SSR__) return;

      const options: VidstackPlayerConfig = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        target: vidstack.value!,
        crossOrigin: true,
        poster: props.poster,
        title: props.title,
        ...props.player,
        layout: new VidstackPlayerLayout({
          colorScheme: props.darkmode ? "dark" : "light",
          thumbnails: props.thumbnails,
          translations: locale.value,
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        if (player!.provider?.type === "hls" && HLS_JS_INSTALLED)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          player!.provider.library = (() =>
            import(
              /* webpackChunkName: "hls" */ "hls.js/dist/hls.min.js"
            )) as HLSConstructorLoader;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        else if (player!.provider?.type === "dash" && DASHJS_INSTALLED)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          player!.provider.library = (() =>
            import(
              /* webpackChunkName: "dashjs" */ "dashjs"
            )) as DASHNamespaceLoader;
      });
    });

    onBeforeUnmount(() => {
      player?.destroy();
    });

    return (): VNode => h("div", { ref: vidstack });
  },
});
