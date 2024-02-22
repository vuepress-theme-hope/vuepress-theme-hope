import { isPlainObject } from "@vuepress/helper/client";
import type { PropType, VNode } from "vue";
import { defineComponent, h, onMounted } from "vue";

import { getLink } from "../utils/getLink.js";

import "vidstack/player/styles/default/theme.css";
import "vidstack/player/styles/default/layouts/audio.css";
import "vidstack/player/styles/default/layouts/video.css";
import "../styles/vidstack.scss";

export interface VidStackSource {
  src: string;
  type: string;
  size: string | number;
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
    onMounted(async () => {
      await Promise.all([
        import(/* webpackChunkName: "vidstack" */ "vidstack/player"),
        import(/* webpackChunkName: "vidstack" */ "vidstack/player/layouts"),
        import(/* webpackChunkName: "vidstack" */ "vidstack/player/ui"),
      ]);
    });

    return (): VNode =>
      h("media-player", attrs, [
        h("media-provider", [
          attrs["poster"]
            ? h("media-poster", {
                class: "vds-poster",
                alt: attrs["alt"] || attrs["title"],
              })
            : null,
          props.sources.map((source) =>
            isPlainObject(source)
              ? h("source", { ...source, src: getLink(source.src) })
              : h("source", { src: getLink(source) }),
          ),
          props.tracks.map((tracks) => h("track", tracks)),
        ]),
        h("media-audio-layout"),
        h("media-video-layout", attrs),
      ]);
  },
});
