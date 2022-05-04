import { defineClientAppEnhance } from "@vuepress/client";

import GloablEncrypt from "@theme-hope/module/encrypt/components/GloablEncrypt";
import LocalEncrypt from "@theme-hope/module/encrypt/components/LocalEncrypt";

export default defineClientAppEnhance(({ app }) => {
  // register to inject styles
  app.component("GloablEncrypt", GloablEncrypt);
  app.component("LocalEncrypt", LocalEncrypt);
});
