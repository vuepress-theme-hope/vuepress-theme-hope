import { defineComponent, h, PropType } from "vue";

import type { UseMediaTextTrackSource } from "@vueuse/core";
import type { VNode } from "vue";

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
    return (): VNode =>
      h(
        "div",
        { class: "video-wrapper" },
        h(
          "video",
          {
            crossorigin: "anonymous",
            poster: props.poster,
            controls: "",
            ...(props.loop
              ? {
                  loop: "",
                }
              : {}),
          },
          [
            ...props.tracks.map((track) => h("track", track)),
            h("source", { src: props.src, type: props.type }),
          ]
        )
      );
  },
});
