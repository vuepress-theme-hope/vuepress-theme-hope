import { initDom, select } from "./dom";
import { getCode, getReactCode, getNormalCode, getVueCode } from "./utils";

import type { CodeDemoOptions } from "../../shared";

export const initDemo = (): void => {
  const containers = select(document, "code-demo-wrapper");

  if (containers.length)
    containers.forEach((container) => {
      if (!container.hasAttribute("demo-inited")) {
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
          const reactCode = getReactCode(codeType, config);

          if (reactCode.script) {
            window.ReactDOM.render(
              window.React.createElement(reactCode.script),
              appElement
            );
          }

          initDom({ code: reactCode, codeType, container, title });
        } else if (type.includes("vue")) {
          const vueCode = getVueCode(codeType, config);

          if (vueCode.script) {
            const app = window.Vue.createApp(vueCode.script);

            app.mount(appElement);
          }

          initDom({ code: vueCode, codeType, container, title });
        } else {
          const normalCode = getNormalCode(codeType, config);

          if (normalCode.script) {
            appElement.innerHTML = normalCode.html;
            normalCode.script();
          }

          initDom({ code: normalCode, codeType, container, title });
        }

        container.setAttribute("demo-inited", "");
      }
    });
  else setTimeout(() => initDemo(), 300);
};
