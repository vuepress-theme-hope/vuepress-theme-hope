/* eslint-disable vue/no-unused-properties */
import { defineComponent, h } from "vue";
import { useSize } from "../composables/index.js";

import type { UseMediaTextTrackSource } from "@vueuse/core";
import type { PropType, VNode } from "vue";

import "../styles/video-player.scss";

export default defineComponent({
  name: "VideoPlayer",

  props: {
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
     * Video poster
     *
     * 视频海报
     */
    poster: {
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
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: Boolean,
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLDivElement>(props);

    return (): VNode =>
      h(
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
      );
  },
});
