import type { App } from "@vuepress/core";

export const prepareRedirects = async (
  app: App,
  config: Record<string, string>,
): Promise<void> => {
  await app.writeTemp(
    "redirect/config.js",
    `\
export const redirectConfig = ${
      app.env.isDev ? JSON.stringify(config, null, 2) : "{}"
    };
`,
  );
};
