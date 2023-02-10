/* eslint-disable vue/no-unused-properties */
import { useEventListener } from "@vueuse/core";
import { type VNode, computed, defineComponent, h, onMounted, ref } from "vue";
import { checkIsMobile } from "vuepress-shared/client";

import { useSize } from "../composables/index.js";
import { videoIframeAllow } from "../utils/index.js";

import "../styles/bili-bili.scss";

export default defineComponent({
  name: "BiliBili",

  props: {
    /**
     * BiliBili video id
     *
     * B 站视频 ID
     */
    bvid: {
      type: String,
      required: true,
    },

    /**
     * BiliBili video title
     *
     * B 站视频标题
     */
    title: {
      type: String,
      default: "A BiliBili video",
    },

    /**
     * BiliBili video page
     *
     * B 站视频分页
     */
    page: {
      type: [String, Number],
      default: 1,
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
     * Start time in seconds
     *
     * 基于秒数的开始时间
     */
    time: {
      type: [String, Number],
      default: 0,
    },

    /**
     * Whether use low quality source
     *
     * 是否使用低质量画质
     */
    lowQuality: Boolean,

    /**
     * Whether to disable danmaku
     *
     * 是否禁用弹幕
     */
    noDanmaku: Boolean,
  },

  setup(props) {
    const isMobile = ref(false);
    // on pc with width >= 640, a 68px hint will be under video
    const extraHeight = computed(() => (isMobile.value ? 0 : 68));

    const updateMobile = (): void => {
      isMobile.value =
        checkIsMobile(navigator.userAgent) || el.value!.clientWidth < 640;
    };

    const { el, width, height } = useSize<HTMLIFrameElement>(
      props,
      extraHeight
    );

    const videoLink = computed(
      () =>
        `https://player.bilibili.com/player.html?bvid=${props.bvid}&t=${
          props.time
        }&high_quality=${props.lowQuality ? 0 : 1}&page=${props.page}&danmaku=${
          props.noDanmaku ? 0 : 1
        }`
    );

    onMounted(() => {
      updateMobile();
      useEventListener("orientationchange", () => updateMobile());
      useEventListener("resize", () => updateMobile());
    });

    return (): VNode[] => [
      h(
        "div",
        { class: "bili-desc" },
        h("a", { class: "sr-only", href: videoLink.value }, props.title)
      ),
      h("iframe", {
        ref: el,
        // Tip: `https://www.bilibili.com/blackboard/newplayer.html?bvid=${props.bvid}&as_wide=1&page=1` only support whitelist sites now
        src: videoLink.value,
        title: props.title,
        class: "bili-iframe",
        allow: videoIframeAllow,
        style: {
          width: width.value,
          height: height.value,
        },
      }),
    ];
  },
});
