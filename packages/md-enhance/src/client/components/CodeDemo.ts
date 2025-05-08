import { LoadingIcon, decodeData } from "@vuepress/helper/client";
import { useEventListener, useResizeObserver, useToggle } from "@vueuse/core";
import type { PropType, SlotsType, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, shallowRef } from "vue";

import { CODEPEN_SVG, JSFIDDLE_SVG } from "./icons.js";
import type { CodeDemoOptions } from "../../shared/index.js";
import { loadNormal, loadReact, loadVue } from "../composables/loadScript.js";
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
    title: String,

    /**
     * Code demo config
     *
     * 代码演示配置
     */
    config: String,

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
        JSON.parse(
          props.config ? decodeData(props.config) : "{}",
        ) as Partial<CodeDemoOptions>,
    );

    const codeType = computed(() => {
      const codeConfig = JSON.parse(decodeData(props.code)) as Record<
        string,
        string
      >;

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
      // Attach a shadow root to demo

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
          return loadReact(code.value).then(() => {
            initDom();
          });
        }
        case "vue": {
          return loadVue(code.value).then(() => {
            initDom();
          });
        }

        default: {
          return loadNormal(code.value).then(() => {
            initDom(true);
          });
        }
      }
    };

    let previousState: boolean | null = null;

    useEventListener("beforeprint", () => {
      toggleIsExpand(true);
    });

    useEventListener("afterprint", () => {
      if (previousState !== null) {
        toggleIsExpand(previousState);
      }

      previousState = null;
    });

    useResizeObserver(codeContainer, () => {
      if (isExpanded.value) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        height.value = `${codeContainer.value!.clientHeight + 14}px`;
      }
    });

    onMounted(async () => {
      await loadDemo();
    });

    return (): VNode =>
      h("div", { class: "vp-container vp-code-demo", id: props.id }, [
        h("div", { class: "vp-container-header" }, [
          code.value.isLegal
            ? h("button", {
                type: "button",
                title: "toggle",
                class: [
                  "vp-code-demo-toggle-button",
                  isExpanded.value ? "down" : "end",
                ],
                onClick: () => {
                  height.value = isExpanded.value
                    ? "0"
                    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      `${codeContainer.value!.clientHeight + 14}px`;
                  toggleIsExpand();
                },
              })
            : null,
          props.title
            ? h(
                "span",
                { class: "vp-container-title" },
                decodeURIComponent(props.title),
              )
            : null,

          code.value.isLegal && (code.value.jsfiddle ?? true)
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
                    "data-balloon-pos": "down",
                  }),
                ],
              )
            : null,

          !code.value.isLegal || (code.value.codepen ?? true)
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
                      html_pre_processor: codeType.value.html[1] ?? "none",
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      js_pre_processor:
                        codeType.value.js[1] ??
                        (code.value.jsx ? "babel" : "none"),
                      // eslint-disable-next-line @typescript-eslint/naming-convention
                      css_pre_processor: codeType.value.css[1] ?? "none",
                      editors: code.value.codepenEditors,
                    }),
                  }),
                  h("button", {
                    type: "submit",
                    innerHTML: CODEPEN_SVG,
                    class: "codepen-button",
                    "aria-label": "Codepen",
                    "data-balloon-pos": "down",
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
            slots.default(),
          ),
        ),
      ]);
  },
});
