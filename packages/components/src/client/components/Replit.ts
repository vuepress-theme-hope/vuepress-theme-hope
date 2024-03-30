/* eslint-disable vue/no-unused-properties */
import type { VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";
import { LoadingIcon } from "vuepress-shared/client";

import { useSize } from "../composables/index.js";

import "../styles/repl-it.scss";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Replit",

  props: {
    /**
     * Replit link
     *
     * Replit 链接
     */
    link: {
      type: String,
      default: "",
    },

    /**
     * Replit username
     *
     * Replit 用户名
     */
    user: {
      type: String,
      default: "",
    },

    /**
     * Replit repl name
     *
     * Replit repl 名
     */
    repl: {
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
     * Whether to enable dark mode
     *
     * 是否启用暗黑模式
     */
    darkmode: Boolean,

    /**
     * The default file to open in the editor
     *
     * 默认打开的文件
     */
    file: {
      type: String,
      default: () => null,
    },

    /**
     * Loading status
     *
     * 加载状态
     */
    autoLoad: Boolean,

    /**
     * Load button text
     *
     * 加载按钮文字
     */
    text: {
      type: String,
      default: "Load Replit",
    },
  },

  setup(props) {
    const { el, width, height, resize } = useSize<HTMLDivElement>(props);

    const shouldLoad = ref(false);
    const loaded = ref(false);

    /**
     * @see https://docs.replit.com/hosting/embedding-repls#how-to-embed-a-repl
     */
    const replLink = computed(() => {
      if (props.link) {
        const url = new URL(props.link);

        url.searchParams.set("embed", "true");
        url.searchParams.set("theme", props.darkmode ? "dark" : "light");

        return url.toString();
      }

      return props.user && props.repl
        ? `https://replit.com/@${props.user}/${props.repl}?embed=true&theme=${props.darkmode ? "dark" : "light"}${
            props.file?.length ? `#${props.file}` : ""
          }`
        : null;
    });

    return (): VNode | null =>
      replLink.value
        ? h(
            "div",
            { class: "replit-wrapper" },
            props.autoLoad || shouldLoad.value
              ? [
                  h("iframe", {
                    ref: el,
                    class: "replit-iframe",
                    src: replLink.value,
                    style: {
                      width: width.value,
                      height: loaded.value ? height.value : 0,
                    },
                    onLoad: () => {
                      loaded.value = true;
                      resize();
                    },
                  }),
                  loaded.value ? null : h(LoadingIcon),
                ]
              : h(
                  "button",
                  {
                    type: "button",
                    class: "replit-button",
                    onClick: () => {
                      shouldLoad.value = true;
                    },
                  },
                  props.text,
                ),
          )
        : null;
  },
});
