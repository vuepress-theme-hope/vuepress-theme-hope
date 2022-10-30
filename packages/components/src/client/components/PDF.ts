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
    url: { type: String, required: true },

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

    page: {
      type: Number,
      default: 1,
    },

    toolbar: {
      type: Boolean,
      default: true,
    },

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
        `#page=${props.page}&toolbar=${props.toolbar ? 1 : 0}&zoom=${
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
