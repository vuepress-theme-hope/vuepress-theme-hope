/* eslint-disable vue/no-unused-properties */
/**
 * @see https://developer.stackblitz.com/platform/api/javascript-sdk
 */
import type { UiThemeOption, UiViewOption } from "@stackblitz/sdk";
import sdk from "@stackblitz/sdk";
import type { PropType, VNode } from "vue";
import { computed, defineComponent, h, onMounted } from "vue";

import { useSize } from "../composables/index.js";

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
     * StackBlitz type
     *
     * StackBlitz 类型
     */
    type: {
      type: String as PropType<"project" | "github">,
      default: "project",
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
      type: [String, Array] as PropType<string | string[]>,
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
     * Embed editor
     *
     * 嵌入编辑器
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
      type: String as PropType<UiViewOption>,
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

    /**
     * Height of the Terminal panel below the editor (as a percentage number).
     */
    terminalHeight: {
      type: [String, Number],
      default: 30,
    },

    /**
     * Height of the Terminal panel below the editor (as a percentage number).
     */
    devToolsHeight: {
      type: [String, Number],
      default: 30,
    },

    /**
     * Button text
     *
     * 按钮文字
     */
    text: {
      type: String,
      default: "Open in StackBlitz",
    },

    /**
     * Theme
     *
     * 主题
     */
    theme: {
      type: String as PropType<UiThemeOption>,
      default: "dark",
    },
  },

  setup(props) {
    const { el, width, height, resize } = useSize<HTMLIFrameElement>(props);

    const options = computed(() => ({
      openFile: props.file,
      view: props.view,
      theme: props.theme,
      clickToLoad: props.load,
      hideExplorer: props.hideExplorer,
      hideNavigation: props.hideNavigation,
      hideDevTools: props.hideDevtools,
      initialPath: props.initialPath,
    }));

    onMounted(async () => {
      if (props.embed) {
        await sdk[
          props.type === "github" ? "embedGithubProject" : "embedProjectId"
        ](el.value!, props.id, options.value);
        resize();
      }
    });

    return (): VNode =>
      props.embed
        ? h("div", {
            ref: el,
            class: "stackblitz-container",
            style: {
              width: width.value,
              height: height.value,
            },
          })
        : h(
            "div",
            { class: "stackblitz-container" },
            h(
              "button",
              {
                type: "button",
                class: "stackblitz-button",
                onClick: () => {
                  sdk[
                    props.type === "github"
                      ? "openGithubProject"
                      : "openProjectId"
                  ](props.id, options.value);
                },
              },
              props.text,
            ),
          );
  },
});
