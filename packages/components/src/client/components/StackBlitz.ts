/* eslint-disable vue/no-unused-properties */
import { defineComponent, h } from "vue";
import { useSize } from "../composables/index.js";

import type { PropType, VNode } from "vue";

import "../styles/stack-blitz.scss";
export default defineComponent({
  name: "StackBlitz",

  props: {
    /**
     * StackBlitz id
     *
     * @description Full StackBlitz url is also supported
     *
     * StackBlitz ID
     *
     * @description 也支持完整的 StackBlitz 链接
     */
    id: {
      type: String,
      required: true,
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
     * The default file to open in the editor
     *
     * 默认打开的文件
     */
    file: {
      type: String,
      default: "",
    },

    /**
     * The initial URL path the preview should open
     *
     * 预览的初始 URL 路径
     */
    initialPath: {
      type: String,
      default: "",
    },

    /**
     * Force embed view regardless of screen size
     *
     * 强制嵌入视图，无论屏幕尺寸如何
     */
    embed: Boolean,

    /**
     * Whether load embed demo directly
     *
     * 是否直接加载嵌入演示
     */
    load: Boolean,

    /**
     * Which view to open by default
     *
     * 默认打开的视图
     */
    view: {
      type: String as PropType<"editor" | "preview">,
      default: "preview",
    },

    /**
     * Hide file explorer panel in embed view
     *
     * 在嵌入视图中隐藏文件资源管理器面板
     */
    hideExplorer: Boolean,

    /**
     * Hide file explorer panel in embed view
     *
     * 在嵌入视图中隐藏文件资源管理器面板
     */
    hideNavigation: Boolean,

    /**
     * Hide the debugging console in the editor preview
     *
     * 隐藏编辑器预览中的调试控制台
     */
    hideDevtools: Boolean,
  },

  setup(props) {
    const { el, width, height } = useSize<HTMLIFrameElement>(props);

    return (): VNode =>
      h("iframe", {
        ref: el,
        class: "stack-blitz-iframe",
        src: `https://stackblitz.com/edit/${props.id}?embed=${
          props.embed ? 1 : 0
        }${props.file ? `&file=${props.file}` : ""}${
          props.initialPath
            ? `&initialpath=${encodeURI(props.initialPath)}`
            : ""
        }&ctl=${props.load ? 0 : 1}&view=${props.view}${
          props.hideExplorer ? "&hideExplorer=1" : ""
        }${props.hideNavigation ? "&hideNavigation=1" : ""}${
          props.hideDevtools ? "&hidedevtools=1" : ""
        }`,
        allow: "clipboard-write",
        style: {
          width: width.value,
          height: height.value,
        },
      });
  },
});
