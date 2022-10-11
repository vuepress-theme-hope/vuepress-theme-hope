import { defineComponent, h } from "vue";
import { useSize } from "../composables/index.js";

import type { UseMediaTextTrackSource } from "@vueuse/core";
import type { PropType, VNode } from "vue";

import "../styles/video-player.scss";

export default defineComponent({
  name: "VideoPlayer",

  props: {
    src: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "",
    },

    width: {
      type: [String, Number],
      default: "100%",
    },

    height: {
      type: [String, Number],
      default: undefined,
    },

    ratio: {
      type: Number,
      default: 16 / 9,
    },

    tracks: {
      type: Array as PropType<UseMediaTextTrackSource[]>,
      default: (): UseMediaTextTrackSource[] => [],
    },

    poster: {
      type: String,
      default: "",
    },

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
        h(
          "video",
          {
            crossorigin: "anonymous",
            poster: props.poster,
            controls: "",
            ...(props.loop ? { loop: "" } : {}),
          },
          [
            ...props.tracks.map((track) => h("track", track)),
            h("source", { src: props.src, type: props.type }),
          ]
        )
      );
  },
});
