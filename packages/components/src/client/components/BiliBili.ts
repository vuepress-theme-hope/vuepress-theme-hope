/* eslint-disable vue/no-unused-properties */
import { type VNode, computed, defineComponent, h } from "vue";

import { useSize } from "../composables/index.js";
import { videoIframeAllow } from "../utils/index.js";

import "../styles/bili-bili.scss";

const VIDEO_LINK = "https://player.bilibili.com/player.html";

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
      default: "",
    },

    /**
     * BiliBili video aid
     *
     * B 站视频 a ID
     */
    aid: {
      type: String,
      default: "",
    },

    /**
     * BiliBili video cid
     *
     * B 站视频 CID
     */
    cid: {
      type: String,
      default: "",
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
     * Whether autoplay
     *
     * 是否自动播放
     */
    autoplay: Boolean,
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLIFrameElement>(props);

    const videoLink = computed(() => {
      const { aid, bvid, cid, autoplay, time, page } = props;

      return aid && cid
        ? `${VIDEO_LINK}?aid=${aid}&cid=${cid}&t=${time}&autoplay=${
            autoplay ? 1 : 0
          }&page=${page}`
        : bvid
        ? `${VIDEO_LINK}?bvid=${bvid}&t=${time}&autoplay=${autoplay ? 1 : 0}`
        : null;
    });

    return (): VNode[] | null =>
      videoLink.value
        ? [
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
          ]
        : null;
  },
});
