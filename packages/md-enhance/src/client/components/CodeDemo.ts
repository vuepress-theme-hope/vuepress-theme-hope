import { computed, defineComponent, h, onMounted, ref } from "vue";
import { CODEPEN_SVG, JSFIDDLE_SVG, LOADING_SVG } from "./icons";
import { loadNormal, loadReact, loadVue } from "../composables";
import {
  injectCSS,
  injectScript,
  getCode,
  getReactCode,
  getNormalCode,
  getVueCode,
} from "../utils";

import type { PropType, VNode } from "vue";
import type { CodeDemoOptions } from "../../shared";

import "balloon-css/balloon.css";
import "../styles/code-demo.scss";

declare const MARKDOWN_ENHANCE_DELAY: number;

export default defineComponent({
  name: "CodeDemo",

  props: {
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"normal" | "vue" | "react">,
      default: "normal",
    },

    title: {
      type: String,
      default: "",
    },

    config: {
      type: String,
      default: "",
    },

    code: {
      type: String,
      required: true,
    },
  },

  setup(props, { slots }) {
    const isExpanded = ref(false);
    const demoWrapper = ref<HTMLDivElement | null>(null);
    const codeContainer = ref<HTMLDivElement | null>(null);
    const height = ref("0");
    const loaded = ref(false);

    const config = computed(
      () =>
        JSON.parse(
          decodeURIComponent(props.config || "{}")
        ) as Partial<CodeDemoOptions>
    );

    const codeType = computed(() => {
      const codeConfig = JSON.parse(
        decodeURIComponent(props.code || "{}")
      ) as Record<string, string>;

      return getCode(codeConfig);
    });

    const code = computed(() =>
      props.type === "react"
        ? getReactCode(codeType.value, config.value)
        : props.type === "vue"
        ? getVueCode(codeType.value, config.value)
        : getNormalCode(codeType.value, config.value)
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
      } else height.value = "auto";

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
      h("div", { class: "code-demo-wrapper", id: props.id }, [
        loaded.value
          ? null
          : h("div", {
              class: ["loading"],
              innerHTML: LOADING_SVG,
            }),
        h("div", { class: "code-demo-header" }, [
          code.value.isLegal
            ? h("button", {
                class: ["toggle-button", isExpanded.value ? "down" : "right"],
                onClick: () => {
                  height.value = isExpanded.value
                    ? "0"
                    : `${codeContainer.value!.clientHeight + 13.8}px`;
                  isExpanded.value = !isExpanded.value;
                },
              })
            : null,
          props.title
            ? h("span", { class: "title" }, decodeURIComponent(props.title))
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
                      ","
                    ),
                  }),
                  h("button", {
                    type: "submit",
                    class: "jsfiddle-button",
                    innerHTML: JSFIDDLE_SVG,
                    "aria-label": "JSFiddle",
                    "data-balloon-pos": "up",
                  }),
                ]
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
                ]
              )
            : null,
        ]),

        h("div", {
          ref: demoWrapper,
          class: "code-demo-container",
          style: {
            display: isLegal.value && loaded.value ? "block" : "none",
          },
        }),

        h(
          "div",
          { class: "code-demo-code-wrapper", style: { height: height.value } },
          h(
            "div",
            {
              ref: codeContainer,
              class: "code-demo-codes",
            },
            slots["default"]?.()
          )
        ),
      ]);
  },
});
