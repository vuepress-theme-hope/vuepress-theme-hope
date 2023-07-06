import { useToggle } from "@vueuse/core";
import type { PropType, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";
import { LoadingIcon, atou } from "vuepress-shared/client";

import { CODEPEN_SVG, JSFIDDLE_SVG } from "./icons.js";
import type { CodeDemoOptions } from "../../shared/index.js";
import { loadNormal, loadReact, loadVue } from "../composables/index.js";
import {
  getCode,
  getNormalCode,
  getReactCode,
  getVueCode,
  injectCSS,
  injectScript,
} from "../utils/index.js";

import "balloon-css/balloon.css";
import "../styles/code-demo.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

export default defineComponent({
  name: "CodeDemo",

  props: {
    /**
     * Code demo id
     *
     * 代码演示 id
     */
    id: {
      type: String,
      required: true,
    },

    /**
     * Code demo type
     *
     * 代码演示类型
     */
    type: {
      type: String as PropType<"normal" | "vue" | "react">,
      default: "normal",
    },

    /**
     * Code demo title
     *
     * 代码演示标题
     */
    title: {
      type: String,
      default: "",
    },

    /**
     * Code demo config
     *
     * 代码演示配置
     */
    config: {
      type: String,
      default: "",
    },

    /**
     * Code demo code content
     *
     * 代码演示代码内容
     */
    code: {
      type: String,
      required: true,
    },
  },

  slots: Object as SlotsType<{
    default: () => VNode[];
  }>,

  setup(props, { slots }) {
    const [isExpanded, toggleIsExpand] = useToggle(false);
    const demoWrapper = shallowRef<HTMLDivElement>();
    const codeContainer = shallowRef<HTMLDivElement>();
    const height = ref("0");
    const loaded = ref(false);

    const config = computed(
      () =>
        <Partial<CodeDemoOptions>>(
          JSON.parse(props.config ? atou(props.config) : "{}")
        ),
    );

    const codeType = computed(() => {
      const codeConfig = <Record<string, string>>JSON.parse(atou(props.code));

      return getCode(codeConfig);
    });

    const code = computed(() =>
      props.type === "react"
        ? getReactCode(codeType.value, config.value)
        : props.type === "vue"
        ? getVueCode(codeType.value, config.value)
        : getNormalCode(codeType.value, config.value),
    );

    const isLegal = computed(() => code.value.isLegal);

    const initDom = (innerHTML = false): void => {
      // attach a shadow root to demo

      const shadowRoot = demoWrapper.value!.attachShadow({ mode: "open" });
      const appElement = document.createElement("div");

      appElement.classList.add("code-demo-app");
      shadowRoot.appendChild(appElement);

      if (isLegal.value) {
        if (innerHTML) appElement.innerHTML = code.value.html;
        injectCSS(shadowRoot, code.value);
        injectScript(props.id, shadowRoot, code.value);

        height.value = "0";
      } else {
        height.value = "auto";
      }

      loaded.value = true;
    };

    const loadDemo = (): Promise<void> => {
      switch (props.type) {
        case "react": {
          return loadReact(code.value).then(() => initDom());
        }
        case "vue": {
          return loadVue(code.value).then(() => initDom());
        }

        default: {
          return loadNormal(code.value).then(() => initDom(true));
        }
      }
    };

    onMounted(() => {
      setTimeout(() => {
        void loadDemo();
      }, MARKDOWN_ENHANCE_DELAY);
    });

    return (): VNode =>
      h("div", { class: "vp-code-demo", id: props.id }, [
        h("div", { class: "vp-code-demo-header" }, [
          code.value.isLegal
            ? h("button", {
                type: "button",
                title: "toggle",
                "aria-hidden": true,
                class: [
                  "vp-code-demo-toggle-button",
                  isExpanded.value ? "down" : "end",
                ],
                onClick: () => {
                  height.value = isExpanded.value
                    ? "0"
                    : `${codeContainer.value!.clientHeight + 13.8}px`;
                  toggleIsExpand();
                },
              })
            : null,
          props.title
            ? h(
                "span",
                { class: "vp-code-demo-title" },
                decodeURIComponent(props.title),
              )
            : null,

          code.value.isLegal && code.value.jsfiddle !== false
            ? h(
                "form",
                {
                  class: "code-demo-jsfiddle",
                  target: "_blank",
                  action: "https://jsfiddle.net/api/post/library/pure/",
                  method: "post",
                },
                [
                  h("input", {
                    type: "hidden",
                    name: "html",
                    value: code.value.html,
                  }),
                  h("input", {
                    type: "hidden",
                    name: "js",
                    value: code.value.js,
                  }),
                  h("input", {
                    type: "hidden",
                    name: "css",
                    value: code.value.css,
                  }),
                  h("input", { type: "hidden", name: "wrap", value: "1" }),
                  h("input", { type: "hidden", name: "panel_js", value: "3" }),
                  h("input", {
                    type: "hidden",
                    name: "resources",
                    value: [...code.value.cssLib, ...code.value.jsLib].join(
                      ",",
                    ),
                  }),
                  h("button", {
                    type: "submit",
                    class: "jsfiddle-button",
                    innerHTML: JSFIDDLE_SVG,
                    "aria-label": "JSFiddle",
                    "data-balloon-pos": "up",
                  }),
                ],
              )
            : null,

          !code.value.isLegal || code.value.codepen !== false
            ? h(
                "form",
                {
                  class: "code-demo-codepen",
                  target: "_blank",
                  action: "https://codepen.io/pen/define",
                  method: "post",
                },
                [
                  h("input", {
                    type: "hidden",
                    name: "data",
                    value: JSON.stringify({
                      html: code.value.html,
                      js: code.value.js,
                      css: code.value.css,
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      js_external: code.value.jsLib.join(";"),
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      css_external: code.value.cssLib.join(";"),
                      layout: code.value.codepenLayout,
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      html_pre_processor: codeType.value
                        ? codeType.value.html[1]
                        : "none",
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      js_pre_processor: codeType.value
                        ? codeType.value.js[1]
                        : code.value.jsx
                        ? "babel"
                        : "none",
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      css_pre_processor: codeType.value
                        ? codeType.value.css[1]
                        : "none",
                      editors: code.value.codepenEditors,
                    }),
                  }),
                  h("button", {
                    type: "submit",
                    innerHTML: CODEPEN_SVG,
                    class: "codepen-button",
                    "aria-label": "Codepen",
                    "data-balloon-pos": "up",
                  }),
                ],
              )
            : null,
        ]),
        loaded.value ? null : h(LoadingIcon, { class: "vp-code-demo-loading" }),
        h("div", {
          ref: demoWrapper,
          class: "vp-code-demo-display",
          style: {
            display: isLegal.value && loaded.value ? "block" : "none",
          },
        }),

        h(
          "div",
          {
            class: "vp-code-demo-code-wrapper",
            style: { height: height.value },
          },
          h(
            "div",
            {
              ref: codeContainer,
              class: "vp-code-demo-codes",
            },
            slots.default?.(),
          ),
        ),
      ]);
  },
});
