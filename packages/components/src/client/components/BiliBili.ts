import { defineComponent, h } from "vue";
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

    height: {
      type: [String, Number],
      default: "auto",
    },

    width: {
      type: [String, Number],
      default: "100%",
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
    return (): VNode | null =>
      h("iframe", {
        ref: "bili",
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
          width:
            typeof props.width === "string" ? props.width : `${props.width}px`,
        },
      });
  },
  mounted() {
    const bili = this.$refs["bili"] as HTMLIFrameElement;

    bili.style.height =
      typeof this.height === "string"
        ? this.height.toLowerCase() == "auto"
          ? bili.scrollWidth > 520
            ? `${(bili.scrollWidth * 9) / 16 + 70}px`
            : `${(bili.scrollWidth * 9) / 16}px`
          : this.height
        : (bili.style.height = `${this.height}px`);
  },
});
