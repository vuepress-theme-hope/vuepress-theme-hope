import { initDom, select } from "./dom";
import { getCode, getReactCode, getNormalCode, getVueCode } from "./utils";

import type * as Vue from "@vue/runtime-dom";
import type { CodeDemoOptions } from "../../shared";

declare global {
  interface Window {
    Vue: typeof Vue;
  }
}

declare const MARKDOWN_DELAY: number;

const loadScript = (
  state: Record<string, Promise<void>>,
  link: string
): Promise<void> => {
  if (state[link] !== undefined) return state[link];

  const loadEvent = new Promise<void>((resolve) => {
    const script = document.createElement("script");

    script.src = link;
    document.getElementsByTagName("body")[0].appendChild(script);

    script.onload = (): void => {
      resolve();
    };
  });

  state[link] = loadEvent;

  return loadEvent;
};

export const initDemo = (): void => {
  setTimeout(() => {
    const containers = select(document, "code-demo-wrapper");

    const state: Record<string, Promise<void>> = {};

    void Promise.all(
      containers.map((container) => {
        if (container.hasAttribute("demo-inited")) return Promise.resolve();

        const appElement = select(container, "code-demo-app")[0];

        const title = decodeURIComponent(container.dataset.title || "");
        const type = decodeURIComponent(container.dataset.type || "normal");
        const config = JSON.parse(
          decodeURIComponent(container.dataset.config || "{}")
        ) as Partial<CodeDemoOptions>;
        const code = JSON.parse(
          decodeURIComponent(container.dataset.code || "{}")
        ) as Record<string, string>;
        const codeType = getCode(code);

        if (type.includes("react")) {
          const code = getReactCode(codeType, config);

          return Promise.all([
            loadScript(state, code.babel),
            loadScript(state, code.react),
            loadScript(state, code.reactDOM),
          ]).then(() => {
            if (code.isLegal) {
              const element = window.React.createElement(code.getComponent());

              window.ReactDOM.render(element, appElement);
            }

            initDom({ code, codeType, container, title });
          });
        } else if (type.includes("vue")) {
          const code = getVueCode(codeType, config);
          const promises = [loadScript(state, code.vue)];

          if (config.useBabel) promises.push(loadScript(state, code.babel));

          return Promise.all(promises).then(() => {
            if (code.isLegal) {
              const app = window.Vue.createApp(code.getScript());

              app.mount(appElement);
            }

            initDom({ code, codeType, container, title });
          });
        } else {
          const code = getNormalCode(codeType, config);

          return (
            config.useBabel ? loadScript(state, code.babel) : Promise.resolve()
          ).then(() => {
            if (code.isLegal) {
              appElement.innerHTML = code.html;
              code.run();
            }

            initDom({ code, codeType, container, title });
          });
        }
      })
    );
  }, MARKDOWN_DELAY);
};
