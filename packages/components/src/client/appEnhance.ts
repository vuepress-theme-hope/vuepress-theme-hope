import { defineClientAppEnhance } from "@vuepress/client";
import Badge from "@Badge";

export default defineClientAppEnhance(({ app }) => {
  // eslint-disable-next-line vue/multi-word-component-names
  if (Badge.name) app.component("Badge", Badge);
});
