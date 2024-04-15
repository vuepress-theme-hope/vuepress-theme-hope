/* eslint-disable vue/no-unused-properties */
import { useLocaleConfig } from "@vuepress/helper/client";
import { useScrollLock } from "@vueuse/core";
import type { VNode } from "vue";
import { defineComponent, h, onMounted, onUnmounted, ref, watch } from "vue";
import {
  CancelFullScreenIcon,
  EnterFullScreenIcon,
} from "vuepress-shared/client";

import type { PDFLocaleConfig } from "../../shared/locales.js";
import { useSize } from "../composables/index.js";
import { getLink, viewPDF } from "../utils/index.js";

import "../styles/pdf.scss";

declare const PDF_LOCALES: PDFLocaleConfig;

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
     * Whether disable fullscreen button
     *
     * 是否禁用全屏按钮
     */
    noFullscreen: Boolean,

    /**
     * Initial zoom level (in percent)
     *
     * 初始缩放比率 (百分比)
     */
    zoom: {
      type: [String, Number],
      default: 100,
    },

    /**
     * Whether use pdfjs viewer by force
     *
     * 是否强制使用 pdfjs 阅读器
     */
    viewer: Boolean,
  },

  setup(props) {
    const { el, width, height, resize } = useSize<HTMLDivElement>(props);
    const locales = useLocaleConfig(PDF_LOCALES);
    const viewer = ref<HTMLElement>();
    const isFullscreen = ref(false);

    onMounted(() => {
      viewPDF(getLink(props.url), viewer.value!, {
        title: props.title,
        hint: locales.value.hint,
        options: {
          page: props.page,
          noToolbar: props.noToolbar,
          ...(props.zoom.toString() === "100" ? {} : { zoom: props.zoom }),
        },
        force: props.viewer,
      });
      resize();

      const isLocked = useScrollLock(document.body);

      watch(isFullscreen, (value) => {
        isLocked.value = value;
      });

      onUnmounted(() => {
        isLocked.value = false;
      });
    });

    return (): VNode =>
      h(
        "div",
        {
          class: ["pdf-viewer-wrapper", { fullscreen: isFullscreen.value }],
          ref: el,
          style: isFullscreen.value
            ? {}
            : {
                width: width.value,
                height: height.value,
              },
        },
        [
          h("div", { ref: viewer }),
          props.noFullscreen
            ? null
            : h(
                "button",
                {
                  class: "pdf-fullscreen-button",
                  onClick: () => {
                    isFullscreen.value = !isFullscreen.value;
                  },
                },
                h(
                  isFullscreen.value
                    ? CancelFullScreenIcon
                    : EnterFullScreenIcon,
                  { class: "pdf-fullscreen-icon" },
                ),
              ),
        ],
      );
  },
});
