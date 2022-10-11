import { defineComponent, h } from "vue";
import { useSize } from "../composables/index.js";

import type { VNode, PropType } from "vue";

import "../styles/stack-blitz.scss";
export default defineComponent({
  name: "StackBlitz",

  props: {
    /**
     * StackBlitz id
     *
     * @description Full StackBlitz url is also supported
     */
    id: {
      type: String,
      required: true,
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

    /**
     * The default file to have open in the editor
     */
    file: {
      type: String,
      default: "",
    },

    /**
     * The initial URL path the preview should open
     */
    initialpath: {
      type: String,
      default: "",
    },

    /**
     * Force embed view regardless of screen size
     */
    embed: {
      type: Boolean,
      default: true,
    },

    /**
     * Require user to 'click to load' the embed demo
     */
    clickToLoad: {
      type: Boolean,
      default: true,
    },

    /**
     * Which view to open by default
     */
    view: {
      type: String as PropType<"editor" | "preview">,
      default: "preview",
    },

    /**
     * Hide file explorer panel in embed view
     */
    hideExplorer: Boolean,

    /**
     * Hide file explorer panel in embed view
     */
    hideNavigation: Boolean,

    /**
     * Hide the debugging console in the editor preview
     */
    hidedevtools: Boolean,
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLIFrameElement>(props);

    return (): VNode =>
      h("iframe", {
        ref: el,
        class: "stack-blitz-iframe",
        src: `https://stackblitz.com/edit/${props.id}?embed=${
          props.embed ? 1 : 0
        }${props.file ? `&file=${props.file}` : ""}${
          props.initialpath
            ? `&initialpath=${encodeURI(props.initialpath)}`
            : ""
        }&ctl=${props.clickToLoad ? 1 : 0}&view=${props.view}${
          props.hideExplorer ? "&hideExplorer=1" : ""
        }${props.hideNavigation ? "&hideNavigation=1" : ""}${
          props.hidedevtools ? "&hidedevtools=1" : ""
        }`,
        allow: "clipboard-write",
        style: {
          width: width.value,
          height: height.value,
        },
      });
  },
});
