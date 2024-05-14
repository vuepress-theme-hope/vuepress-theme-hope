import type { App } from "vuepress/core";

/**
 * @private
 */
export const prepareSocialMediaIcons = async (
  app: App,
  icons?: Record<string, string> | null,
): Promise<void> => {
  if (icons)
    await app.writeTemp(
      `theme-hope/socialMedia.js`,
      `\
export const icons = ${JSON.stringify(icons)};
`,
    );
};
