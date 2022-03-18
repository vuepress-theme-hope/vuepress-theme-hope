import { computed, defineComponent, h, onMounted, ref } from "vue";
import { loadingSvgString } from "./icons";
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
    // const codeWrapper = ref<HTMLDivElement | null>(null);
    const demoWrapper = ref<HTMLDivElement | null>(null);
    const codeContainer = ref<HTMLDivElement | null>(null);
    const height = ref("0px");
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
              innerHTML: loadingSvgString,
            }),
        h("div", {
          ref: demoWrapper,
          class: "demo-wrapper",
          style: {
            display: isLegal.value && loaded.value ? "block" : "none",
          },
        }),
        h(
          "div",
          { class: "code-wrapper", style: { height: height.value } },
          h(
            "div",
            {
              ref: codeContainer,
              class: "code-container",
            },
            slots.default?.()
          )
        ),
        h("div", { class: "code-demo-footer" }, [
          code.value.isLegal
            ? h("button", {
                class: ["toggle-button", { down: !isExpanded.value }],
                onClick: () => {
                  height.value = isExpanded.value
                    ? "0"
                    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      `${codeContainer.value!.clientHeight + 13.8}px`;
                  isExpanded.value = !isExpanded.value;
                },
              })
            : null,
          props.title
            ? h("span", { class: "title" }, decodeURIComponent(props.title))
            : null,
          code.value.isLegal && config.value.jsfiddle !== false
            ? h(
                "form",
                {
                  className: "code-demo-jsfiddle",
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
                    className: "button",
                    innerHTML:
                      '<svg class="icon" viewBox="0 0 1170 1024" xmlns="http://www.w3.org/2000/svg" width="228.516" height="200"><defs><style/></defs><path d="M1028.571 441.143q63.429 26.286 102.572 83.143t39.143 126.571q0 93.714-67.429 160.286T940 877.714q-2.286 0-6.571-.285t-6-.286H232q-97.143-5.714-164.571-71.714T0 645.143q0-62.857 31.429-116t84-84q-6.858-22.286-6.858-46.857 0-65.715 46.858-112T269.143 240q54.286 0 98.286 33.143 42.857-88 127.142-141.714t186.572-53.715q94.857 0 174.857 46t126.571 124.857 46.572 172q0 3.429-.286 10.286t-.286 10.286zm-761.142 152q0 69.714 48 110.286T434.286 744q78.285 0 137.143-56.571-9.143-11.429-27.143-32.286t-24.857-28.857q-38.286 37.143-82.286 37.143-31.429 0-53.429-19.143t-22-50q0-30.286 22-49.715T436 525.143q25.143 0 48.286 12T526 568.57t37.143 42.858 39.428 46.857 44 42.857T702 732.57t69.429 12q69.142 0 116.857-40.857T936 594.857q0-69.143-48-109.714T769.714 444.57Q688 444.571 632 500l53.143 61.714q37.714-36.571 81.143-36.571 29.714 0 52.571 18.857t22.857 48q0 32.571-21.143 52.286T766.857 664q-24.571 0-47.143-12t-41.143-31.429-37.428-42.857-39.714-46.857T557.143 488 502 456.571t-67.714-12q-69.715 0-118.286 40.286t-48.571 108.286z"/></svg>',
                    ariaLabel: "JSFiddle",
                    "data-tip": "JSFiddle",
                  }),
                ]
              )
            : null,

          !code.value.isLegal || config.value.codepen !== false
            ? h(
                "form",
                {
                  className: "code-demo-codepen",
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
                    innerHTML:
                      '<svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><defs><style/></defs><path d="M123.429 668L468 897.714V692.571L277.143 565.143zM88 585.714L198.286 512 88 438.286v147.428zm468 312L900.571 668 746.857 565.143 556 692.57v205.143zM512 616l155.429-104L512 408 356.571 512zM277.143 458.857L468 331.43V126.286L123.429 356zM825.714 512L936 585.714V438.286zm-78.857-53.143L900.571 356 556 126.286v205.143zM1024 356v312q0 23.429-19.429 36.571l-468 312Q524.571 1024 512 1024t-24.571-7.429l-468-312Q0 691.43 0 668V356q0-23.429 19.429-36.571l468-312Q499.429 0 512 0t24.571 7.429l468 312Q1024 332.57 1024 356z"/></svg>',
                    className: "button",
                    ariaLabel: "Codepen",
                    "data-tip": "Codepen",
                  }),
                ]
              )
            : null,
        ]),
      ]);
  },
});
