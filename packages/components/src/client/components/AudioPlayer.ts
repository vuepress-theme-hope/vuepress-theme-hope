import type { Options as PlyrOptions } from "plyr";
import type { PropType, VNode } from "vue";
import { defineComponent, h, onBeforeMount, onMounted, shallowRef } from "vue";

import { getLink } from "../utils/index.js";

import "plyr/dist/plyr.css";
import "../styles/audio-player.scss";

export default defineComponent({
  name: "AudioPlayer",

  props: {
    /** Options object for plyr config. **/
    options: {
      type: Object as PropType<PlyrOptions>,
      default: () => ({}),
    },

    /**
     * Audio source
     *
     * 音频源
     */
    src: {
      type: String,
      required: true,
    },

    /**
     * Audio title
     *
     * 音频标题
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Audio file type
     *
     * 音频文件类型
     */
    type: {
      type: String,
      default: "",
    },

    /**
     * Audio poster
     *
     * 音频封面
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
    const audio = shallowRef<HTMLAudioElement>();

    onMounted(async () => {
      const { default: Plyr } = await import(
        /* webpackChunkName: "plyr" */ "plyr"
      );

      player = new Plyr(audio.value!, {
        // @ts-ignore
        hideYouTubeDOMError: true,
        ...props.options,
      });
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
          class: "vp-audio-player",
          style: {
            width: props.width,
          },
        },
        [
          h("a", {
            class: "sr-only",
            href: getLink(props.src),
            innerHTML: props.title || "An audio",
          }),
          props.poster
            ? h("img", {
                class: "vp-audio-player-poster",
                src: getLink(props.poster),
                loading: "lazy",
                "no-view": "",
              })
            : null,
          h("div", { class: "vp-audio-player-info" }, [
            props.title
              ? h("div", {
                  class: "vp-audio-player-title",
                  innerHTML: props.title,
                })
              : null,
            h(
              "audio",
              {
                ref: audio,
                crossorigin: "anonymous",
                preload: "metadata",
                controls: "",
                ...(props.loop ? { loop: "" } : {}),
              },
              h("source", { src: getLink(props.src), type: props.type }),
            ),
          ]),
        ],
      );
  },
});
