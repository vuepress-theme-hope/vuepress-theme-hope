import { getCode, getReactCode, getNormalCode, getVueCode } from "./code";
import { initDom, select } from "./dom";
import { loadScript } from "./utils";

import type { CodeDemoOptions } from "../../types";

export const initDemo = (): Promise<void[]> => {
  const containers = select(document, "code-demo-wrapper");

  const state: Record<string, Promise<void>> = {};

  return Promise.all(
    containers.map((container) => {
      if (container.hasAttribute("demo-inited")) return Promise.resolve();

      const type = decodeURIComponent(container.dataset.type || "normal");
      const config = JSON.parse(
        decodeURIComponent(container.dataset.config || "{}")
      ) as Partial<CodeDemoOptions>;
      const codeConfig = JSON.parse(
        decodeURIComponent(container.dataset.code || "{}")
      ) as Record<string, string>;
      const codeType = getCode(codeConfig);

      switch (type) {
        case "react": {
          const code = getReactCode(codeType, config);

          return Promise.all([
            loadScript(state, code.babel),
            loadScript(state, code.react),
            loadScript(state, code.reactDOM),
          ]).then(() => initDom({ code, codeType, container }));
        }
        case "vue": {
          const code = getVueCode(codeType, config);
          const promises = [loadScript(state, code.vue)];

          if (code.useBabel) promises.push(loadScript(state, code.babel));

          return Promise.all(promises).then(() =>
            initDom({ code, codeType, container })
          );
        }

        default: {
          const code = getNormalCode(codeType, config);

          return (
            code.useBabel ? loadScript(state, code.babel) : Promise.resolve()
          ).then(() => initDom({ code, codeType, container, innerHTML: true }));
        }
      }
    })
  );
};
