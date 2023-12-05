import { container } from "@mdit/plugin-container";
import type { PluginSimple } from "markdown-it";

export const vPre: PluginSimple = (md) => {
  container(md, {
    name: "v-pre",
    openRender: () => `<div v-pre>\n`,
    closeRender: () => "</div>\n",
  });
};
