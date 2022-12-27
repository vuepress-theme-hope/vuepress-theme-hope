/* eslint-disable vue/no-unused-properties */
import { defineComponent, h, onMounted } from "vue";

import { useSize } from "../composables/index.js";
import { getLink, viewPDF } from "../utils/index.js";

import type { VNode } from "vue";

import "../styles/pdf.scss";

export default defineComponent({
  name: "PDF",

  props: {
    /**
     * PDF link, should be absolute url
     *
     * PDF 文件链接，应为完整链接
     */
    url: {
      type: String,
      required: true,
    },

    /**
     * PDF title
     *
     * PDF 标题
     */
    title: {
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
     * Component height
     *
     * 组件高度
     */
    height: {
      type: [String, Number],
      default: undefined,
    },

    /**
     * Component width / height ratio
     *
     * 组件长宽比
     */
    ratio: {
      type: [String, Number],
      default: 16 / 9,
    },

    /**
     * PDF initial page number
     *
     * PDF 初始页码
     *
     * @description Chrome only
     */
    page: {
      type: [String, Number],
      default: 1,
    },

    /**
     * Whether show toolbar
     *
     * 是否显示工具栏
     *
     * @description Chrome only
     */
    noToolbar: Boolean,

    /**
     * initial zoom level (in percent)
     *
     * 初始缩放比率 (百分比)
     */
    zoom: {
      type: [String, Number],
      default: 100,
    },
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLDivElement>(props);

    onMounted(() => {
      viewPDF(getLink(props.url), el.value, {
        title: props.title,
        options: {
          page: props.page,
          noToolbar: props.noToolbar,
          zoom: props.zoom,
        },
      });
    });

    return (): VNode => {
      return h("div", {
        class: "pdf-preview",
        ref: el,
        style: {
          width: width.value,
          height: height.value,
        },
      });
    };
  },
});
