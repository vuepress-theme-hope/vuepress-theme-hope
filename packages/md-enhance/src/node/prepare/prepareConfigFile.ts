import type { App } from "vuepress/core";

import type { MarkdownEnhancePluginOptions } from "../options.js";
import { CLIENT_FOLDER } from "../utils.js";

export const prepareConfigFile = (
  app: App,
  options: MarkdownEnhancePluginOptions,
  status: Record<string, boolean>,
  legacy = false,
): Promise<string> => {
  const imports = new Set<string>();
  const enhances = new Set<string>();

  if (options.demo) {
    imports.add(
      `import CodeDemo from "${CLIENT_FOLDER}components/CodeDemo.js";`,
    );
    enhances.add(`app.component("CodeDemo", CodeDemo);`);

    if (legacy) {
      imports.add(`import MdDemo from "${CLIENT_FOLDER}components/MdDemo.js";`);
      enhances.add(`app.component("MdDemo", MdDemo);`);
    }
  }

  if (status.kotlinPlayground) {
    imports.add(
      `import KotlinPlayground from "${CLIENT_FOLDER}components/KotlinPlayground.js";`,
    );
    enhances.add(`app.component("KotlinPlayground", KotlinPlayground);`);
  }

  if (options.playground) {
    imports.add(
      `import Playground from "${CLIENT_FOLDER}components/Playground.js";`,
    );
    enhances.add(`app.component("Playground", Playground);`);
  }

  if (status.sandpack) {
    imports.add(
      `import SandPack from "${CLIENT_FOLDER}components/SandPack.js";`,
    );

    enhances.add(`app.component("SandPack", SandPack);`);
  }

  if (status.vuePlayground) {
    imports.add(
      `import VuePlayground from "${CLIENT_FOLDER}components/VuePlayground.js";`,
    );
    enhances.add(`app.component("VuePlayground", VuePlayground);`);
  }

  return app.writeTemp(
    `md-enhance/config.js`,
    `\
${[...imports.values()].join("\n")}

export default {
  enhance: ({ app }) => {
${[...enhances.values()]
  .flatMap((item) => item.split("\n").map((line) => `    ${line}`))
  .join("\n")}
  },
};
`,
  );
};
