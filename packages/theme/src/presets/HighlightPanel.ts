import { type PropType, type VNode, defineComponent, h } from "vue";

import HighLight, { type HighlightSection } from "./HighLightSection.js";

import "./highlight-panel.scss";

export default defineComponent({
  name: "HighlightPanel",

  props: {
    /**
     * Highlight items
     */
    items: {
      type: Array as PropType<HighlightSection[]>,
      required: true,
    },
  },

  setup(props) {
    return (): VNode =>
      h(
        "div",
        { class: "vp-highlight-panel" },
        props.items.map((item) => h(HighLight, item))
      );
  },
});
