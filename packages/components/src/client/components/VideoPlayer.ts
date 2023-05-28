import { type UseMediaTextTrackSource } from "@vueuse/core";
import { type Options as PlyrOptions } from "plyr";
import {
  type PropType,
  type VNode,
  computed,
  defineComponent,
  h,
  onBeforeMount,
  onMounted,
  shallowRef,
} from "vue";

import { getLink } from "../utils/index.js";

import "plyr/dist/plyr.css";
import "../styles/video-player.scss";

export default defineComponent({
  name: "VideoPlayer",

  props: {
    /** Options object for plyr config. **/
    options: {
      type: Object as PropType<PlyrOptions>,
      default: () => ({}),
    },

    /**
     * Video source
     *
     * 视频源
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Video title
     *
     * 视频标题
     */
    title: {
      type: String,
      default: "A video",
    },

    /**
     * Video file type
     *
     * 视频文件类型
     */
    type: {
      type: String,
      default: "",
    },

    /**
     * Video tracks
     *
     * 视频字幕
     */
    tracks: {
      type: Array as PropType<UseMediaTextTrackSource[]>,
      default: (): UseMediaTextTrackSource[] => [],
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
     * Component width
     *
     * 组件宽度
     */
    width: {
      type: [String, Number],
      default: "100%",
    },

    /**
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: Boolean,
  },

  setup(props) {
    let player: Plyr | null = null;
    const video = shallowRef<HTMLVideoElement>();

    const plyrOptions = computed(() => ({
      hideYouTubeDOMError: true,
      ...props.options,
    }));

    onMounted(async () => {
      const { default: Plyr } = await import(
        /* webpackChunkName: "plyr" */ "plyr"
      );

      player = new Plyr(video.value!, plyrOptions.value);
    });

    onBeforeMount(() => {
      try {
        player?.destroy();
      } catch (err: unknown) {
        // do nothing
      }
    });

    return (): VNode =>
      h(
        "div",
        {
          class: "vp-video-player",
          style: {
            width: props.width,
          },
        },
        [
          h("a", { class: "sr-only", href: getLink(props.src) }, props.title),
          h(
            "video",
            {
              ref: video,
              title: props.title,
              crossorigin: "anonymous",
              poster: getLink(props.poster),
              preload: "metadata",
              controls: "",
              ...(props.loop ? { loop: "" } : {}),
            },
            [
              props.tracks.map((track) =>
                h("track", { ...track, src: getLink(track.src) })
              ),
              h("source", { src: getLink(props.src), type: props.type }),
            ]
          ),
        ]
      );
  },
});
