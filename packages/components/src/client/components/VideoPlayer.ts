/* eslint-disable vue/no-unused-properties */
import Plyr from "plyr";
import {
  computed,
  defineComponent,
  h,
  onBeforeMount,
  onMounted,
  ref,
} from "vue";

import { useSize } from "../composables/index.js";

import type { UseMediaTextTrackSource } from "@vueuse/core";
import type { Options as PlyrOptions } from "plyr";
import type { PropType, VNode } from "vue";

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
     * 视频海报
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
      type: Number,
      default: 16 / 9,
    },

    /**
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: Boolean,
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLIFrameElement>(props);

    let player: Plyr | null = null;
    const video = ref<HTMLVideoElement>();

    const plyrOptions = computed(() => ({
      hideYouTubeDOMError: true,
      ...props.options,
    }));

    onMounted(() => {
      if (video.value) player = new Plyr(video.value, plyrOptions.value);
    });

    onBeforeMount(() => {
      try {
        player?.destroy();
      } catch (err: unknown) {
        if (
          !(
            plyrOptions.value.hideYouTubeDOMError &&
            (<Error>err).message ===
              "The YouTube player is not attached to the DOM."
          )
        )
          console.error(err);
      }
    });

    return (): VNode[] | VNode | null =>
      props.src
        ? h(
            "div",
            {
              class: "video-wrapper",
              ref: el,
              style: {
                width: width.value,
                height: height.value,
              },
            },
            [
              h("a", { class: "sr-only", href: props.src }, props.title),
              h(
                "video",
                {
                  ref: video,
                  title: props.title,
                  crossorigin: "anonymous",
                  poster: props.poster,
                  controls: "",
                  ...(props.loop ? { loop: "" } : {}),
                },
                [
                  ...props.tracks.map((track) => h("track", track)),
                  h("source", { src: props.src, type: props.type }),
                ]
              ),
            ]
          )
        : null;
  },
});
