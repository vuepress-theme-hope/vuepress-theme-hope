import { handleRedirect } from "./extends";
import { generateHTML } from "./generate";

import type { Page, PluginObject } from "@vuepress/core";
import type {
  RedirectOptions,
  RedirectPluginFrontmatterOption,
} from "../shared";

export const redirectPlugin = (options: RedirectOptions): PluginObject => ({
  name: "vuepress-plugin-redirect2",

  extendsPage: (page, app) =>
    handleRedirect(
      page as Page<Record<string, never>, RedirectPluginFrontmatterOption>,
      app,
      options
    ),

  onGenerated: (app): Promise<void> => generateHTML(app, options),
});
