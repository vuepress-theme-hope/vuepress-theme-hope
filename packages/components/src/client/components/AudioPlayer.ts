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

import type { UseMediaTextTrackSource } from "@vueuse/core";
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
      default: "",
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
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: Boolean,
  },

  setup(props) {
    let player: Plyr | null = null;
    const audio = ref<HTMLVideoElement>();

    const plyrOptions = computed(() => ({
      hideYouTubeDOMError: true,
      ...props.options,
    }));

    onMounted(() => {
      if (audio.value) player = new Plyr(audio.value, plyrOptions.value);
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
              h(
                "a",
                { class: "audio-print", href: props.src },
                props.title || "An audio"
              ),
              props.poster
                ? h("img", { class: "audio-poster", src: props.poster })
                : null,
              h("div", { class: "audio-info" }, [
                props.title
                  ? h("div", { class: "audio-title" }, props.title)
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
                  h("source", { src: props.src, type: props.type })
                ),
              ]),
            ]),
          ]
        : null;
  },
});
