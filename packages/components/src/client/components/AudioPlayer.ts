import {
  computed,
  defineComponent,
  h,
  onBeforeMount,
  onMounted,
  ref,
} from "vue";
import { getLink } from "../utils/getLink.js";

import type { Options as PlyrOptions } from "plyr";
import type { PropType, VNode } from "vue";

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
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: Boolean,
  },

  setup(props) {
    let player: Plyr | null = null;
    const audio = ref<HTMLAudioElement>();

    const plyrOptions = computed(() => ({
      hideYouTubeDOMError: true,
      ...props.options,
    }));

    onMounted(() => {
      void import("plyr").then(({ default: Plyr }) => {
        if (audio.value) player = new Plyr(audio.value, plyrOptions.value);
      });
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

    return (): VNode[] | null =>
      props.src
        ? [
            h("div", { class: "audio-wrapper" }, [
              h("a", {
                class: "audio-print",
                href: getLink(props.src),
                innerHTML: props.title || "An audio",
              }),
              props.poster
                ? h("img", {
                    class: "audio-poster",
                    src: getLink(props.poster),
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
            ]),
          ]
        : null;
  },
});
