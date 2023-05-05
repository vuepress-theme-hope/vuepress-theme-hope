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

    const plyrOptions = computed(() => ({
      hideYouTubeDOMError: true,
      ...props.options,
    }));

    onMounted(async () => {
      const { default: Plyr } = await import(
        /* webpackChunkName: "plyr" */ "plyr"
      );

      player = new Plyr(audio.value!, plyrOptions.value);
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
          class: "audio-player-wrapper",
          style: {
            width: props.width,
          },
        },
        [
          h("a", {
            class: "audio-print",
            href: getLink(props.src),
            innerHTML: props.title || "An audio",
          }),
          props.poster
            ? h("img", {
                class: "audio-poster",
                src: getLink(props.poster),
                "no-view": "",
              })
            : null,
          h("div", { class: "audio-info" }, [
            props.title
              ? h("div", { class: "audio-title", innerHTML: props.title })
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
              h("source", { src: getLink(props.src), type: props.type })
            ),
          ]),
        ]
      );
  },
});
