/* eslint-disable vue/no-unused-properties */
import { type VNode, computed, defineComponent, h } from "vue";

import { useSize } from "../composables/size.js";
import { videoIframeAllow } from "../utils/iframeAllow.js";

import "../styles/repl-it.scss";

export default defineComponent({
  name: "ReplIt",

  props: {
    /**
     * ReplIt link
     *
     * ReplIt 链接
     */
    link: { type: String, default: "" },

    /**
     * ReplIt username
     *
     * ReplIt 用户名
     */
    user: { type: String, default: "" },

    /**
     * ReplIt repl name
     *
     * ReplIt repl 名
     */
    repl: { type: String, default: "" },

    /**
     * ReplIt title
     *
     * ReplIt 标题
     */
    title: { type: String, default: "" },

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
     * ReplIt theme
     *
     * ReplIt 主题
     */
    theme: {
      type: String,
      default: "light",
    },

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
     * embed repl
     *
     * 嵌入 repl
     */
    embed: Boolean,

    /**
     * Button text
     *
     * 按钮文字
     */
    text: {
      type: String,
      default: "Open on Replit",
    },
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLDivElement>(props);

    const getInfo = (): {
      user: string | undefined;
      repl: string | undefined;
      file: string | undefined;
    } => {
      const result =
        /(?:^(?:https?:)?\/\/replit.com\/|^\/|^)(.*?)\/(.*?)\/(?:embed.*)(#.*)$/.exec(
          props.link
        );

      return {
        user: result?.[1],
        repl: result?.[2],
        file: result?.[2],
      };
    };

    const user = computed(() => getInfo().user || props.user);
    const repl = computed(() => getInfo().repl || props.repl);
    const file = computed(() => getInfo().file || props.file);
    const replLink = computed(
      () =>
        `https://replit.com/@${user.value}/${repl.value}${
          file.value && file.value.length > 0 ? "#" + file.value : ""
        }`
    );
    const replEmbedLink = computed(
      () =>
        `https://replit.com/@${user.value}/${repl.value}?embed=true${
          file.value && file.value.length > 0 ? "#" + file.value : ""
        }`
    );

    return (): VNode =>
      h(
        "div",
        {
          class: ["replit-wrapper"],
          "data-height": props.height,
          "data-theme": props.theme,
          "data-user": user.value,
          "data-repl": repl.value,
          "data-file": file.value,
          "data-repl-title": props.title,
          user: props.user,
        },
        [
          props.embed
            ? h("iframe", {
                ref: el,
                src: replEmbedLink.value,
                title: props.title,
                class: "replit-iframe",
                allow: videoIframeAllow,
                style: {
                  width: width.value,
                  height: height.value,
                },
              })
            : h("div", [
                h(
                  "a",
                  {
                    href: replLink.value,
                    target: "_blank",
                    title: props.title || repl.value,
                    class: ["replit-button"],
                  },
                  [props.text]
                ),
              ]),
        ]
      );
  },
});
