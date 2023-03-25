import { defineClientConfig } from "@vuepress/client";

import LanguageSwitch from "./components/LanguageSwitch.js";
import { setupRedirect } from "./composables/redirect.js";
import { redirectLocaleSwitch } from "./define.js";

declare const __VUEPRESS_DEV__: boolean;

export default defineClientConfig({
  setup() {
    if (__VUEPRESS_DEV__) setupRedirect();
  },
  rootComponents: redirectLocaleSwitch ? [LanguageSwitch] : [],
});
