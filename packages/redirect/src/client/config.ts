import type { ClientConfig } from "vuepress/client";
import { defineClientConfig } from "vuepress/client";

import LanguageSwitch from "./components/LanguageSwitch.js";
import { setupRedirect } from "./composables/redirect.js";
import { enableLocaleSwitch } from "./define.js";

declare const __VUEPRESS_DEV__: boolean;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default <ClientConfig>defineClientConfig({
  setup() {
    if (__VUEPRESS_DEV__) setupRedirect();
  },
  rootComponents: enableLocaleSwitch ? [LanguageSwitch] : [],
});
