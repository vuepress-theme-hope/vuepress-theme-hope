import { useEventListener } from "@vueuse/core";
import { checkIsMobile } from "vuepress-shared/lib/client";
import { computed, defineComponent, h, onMounted, ref } from "vue";
import { useSize } from "../composables/index.js";

import type { VNode } from "vue";

import "../styles/bilibli.scss";

export default defineComponent({
  name: "BiliBili",

  props: {
    bvid: {
      type: String,
      required: true,
    },

    page: {
      type: Number,
      default: 1,
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

    time: {
      type: Number,
      default: 0,
    },

    highQuality: {
      type: Boolean,
      default: true,
    },

    danmaku: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const isMobile = ref(false);
    // on pc with width >= 640, a 68px hint will be under video
    const extraHeight = computed(() => (isMobile.value ? 0 : 68));

    const updateMobile = (): void => {
      isMobile.value =
        checkIsMobile(navigator.userAgent) || el.value!.clientWidth < 640;
    };

    onMounted(() => {
      updateMobile();
      useEventListener("orientationchange", () => updateMobile());
      useEventListener("resize", () => updateMobile());
    });

    const { el, width, height } = useSize<HTMLIFrameElement>(
      props,
      extraHeight
    );

    return (): VNode | null =>
      h("iframe", {
        ref: el,
        // Tip: `https://www.bilibili.com/blackboard/newplayer.html?bvid=${props.bvid}&as_wide=1&page=1` only support whitelist sites now
        src: `https://player.bilibili.com/player.html?bvid=${props.bvid}&t=${
          props.time
        }&high_quality=${props.highQuality ? 1 : 0}&page=${
          props.page
        }&danmaku=${props.danmaku ? 1 : 0}`,
        class: "bilibili-iframe",
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture",
        style: {
          width: width.value,
          height: height.value,
        },
      });
  },
});
