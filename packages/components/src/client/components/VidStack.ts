import { useStyleTag } from "@vueuse/core";
import { defineCustomElements } from "vidstack/elements";
import type { PropType, VNode } from "vue";
import { defineComponent, h, onMounted } from "vue";
import { isPlainObject } from "vuepress-shared/client";

// import "vidstack/styles/defaults.css";
// import "vidstack/styles/community-skin/audio.css";
// import "vidstack/styles/community-skin/video.css";
import "../styles/vidstack.scss";

export interface VidStackSource {
  src: string;
  type: string;
}

export interface VidStackTrack {
  /**
   * Track source URL.
   */
  src: string;

  /**
   * The language of the text track data. It must be a valid BCP 47 language tag.
   */
  srclang: string;

  /**
   * If true, this track will be enabled by default.
   *
   * @default false
   */
  default?: boolean;

  /**
   * A string which uniquely identifies the track within the media.
   */
  id?: string;

  /**
   * A human-readable label for the track, or an empty string if unknown.
   *
   * @default ''
   */
  label?: string;

  /**
   * A string specifying the category into which the track falls. For example, the main audio
   * track would have a kind of "main".
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AudioTrack/kind}
   */
  kind: string;
}

export default defineComponent({
  name: "VidStack",

  props: {
    /**
     * VidStack sources
     */
    sources: {
      type: Array as PropType<(VidStackSource | string)[]>,
      default: () => [],
    },

    /**
     * VidStack tracks
     */
    tracks: { type: Array as PropType<VidStackTrack[]>, default: () => [] },
  },

  setup(props, { attrs }) {
    // FIXME: Workaround for https://github.com/vuepress/vuepress-next/issues/1349
    useStyleTag(
      [
        "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/defaults.css",
        "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/community-skin/audio.css",
        "https://cdn.jsdelivr.net/npm/vidstack@0.6/styles/community-skin/video.css",
      ]
        .map((url) => `@import url("${url}");`)
        .join("\n"),
      { id: "vidstack-style" },
    );

    onMounted(() => defineCustomElements());

    return (): VNode =>
      h(
        "media-player",
        {
          crossorigin: "",
          ...attrs,
        },
        [
          h("media-outlet", [
            props.sources.map((source) =>
              isPlainObject(source)
                ? h("source", { src: source.src, type: source.type })
                : h("source", source),
            ),
            h("media-gesture", { event: "pointerup", action: "toggle:paused" }),
            h("media-gesture", {
              event: "dblclick",
              action: "toggle:fullscreen",
            }),
            attrs["poster"]
              ? h("media-poster", { alt: attrs["alt"] || attrs["title"] })
              : null,
            props.tracks.map(
              ({ src, label, srclang, kind, default: isDefault }) =>
                h("track", { src, label, srclang, kind, default: isDefault }),
            ),
          ]),
          h("media-community-skin"),
        ],
      );
  },
});
