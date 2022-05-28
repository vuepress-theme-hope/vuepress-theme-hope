import type { App } from "@vuepress/core";

export const prepareSocialMediaIcons = async (
  app: App,
  icons: Record<string, string>
): Promise<void> => {
  await app.writeTemp(
    `theme-hope/socialMedia.js`,
    `export const icons = ${JSON.stringify(icons)}`
  );
};
