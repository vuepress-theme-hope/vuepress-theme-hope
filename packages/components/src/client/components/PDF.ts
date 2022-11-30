/* eslint-disable vue/no-unused-properties */
import { withBase } from "@vuepress/client";
import { isLinkHttp } from "@vuepress/shared";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import {
  checkIsMobile,
  checkIsiPad,
  checkIsiPhone,
  checkIsSafari,
} from "vuepress-shared/client";
import { useSize } from "../composables/index.js";

import type { VNode } from "vue";

import "../styles/pdf.scss";

// eslint-disable-next-line @typescript-eslint/naming-convention
declare const __VUEPRESS_SSR__: boolean;

export default defineComponent({
  name: "PDF",

  props: {
    /**
     * PDF link, should be absolute url
     *
     * PDF 文件链接，应为完整链接
     */
    url: { type: String, required: true },

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
      type: Number,
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
      type: Number,
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
      type: Number,
      default: 100,
    },
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLDivElement>(props);
    const isChrome = ref(true);
    const isMobile = ref(false);

    const hash = computed(
      () =>
        `#page=${props.page}&toolbar=${props.noToolbar ? 0 : 1}&zoom=${
          props.zoom
        }`
    );

    onMounted(() => {
      const { userAgent } = navigator;

      // chrome mobile
      if (checkIsMobile(userAgent)) isMobile.value = true;
      else if (
        checkIsSafari(userAgent) &&
        (checkIsiPad(userAgent) || checkIsiPhone(userAgent))
      ) {
        isChrome.value = false;

        if (checkIsiPad(userAgent) || checkIsiPhone(userAgent))
          isMobile.value = true;
      }
    });

    return (): VNode => {
      const fullLink = isLinkHttp(props.url)
        ? props.url
        : __VUEPRESS_SSR__
        ? ""
        : `${window?.location.origin || ""}${withBase(props.url)}`;

      return h(
        "div",
        {
          class: "pdf-preview",
          ref: el,
          style: {
            width: width.value,
            height: height.value,
          },
        },
        [
          h("iframe", {
            class: "pdf-iframe",
            src: isMobile.value
              ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURI(
                  fullLink
                )}`
              : `${withBase(props.url)}${isChrome.value ? hash.value : ""}`,
          }),
          h(
            "button",
            {
              class: "pdf-open-button",
              onClick: () => {
                window.open(fullLink);
              },
            },
            "Open"
          ),
        ]
      );
    };
  },
});
