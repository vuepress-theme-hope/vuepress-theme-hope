import { defineClientConfig } from "@vuepress/client";
import { useScriptTag } from "@vueuse/core";

declare const PUB_ID: string;

export default defineClientConfig({
  setup() {
    useScriptTag(`//s7.addthis.com/js/300/addthis_widget.js#pubid=${PUB_ID}`);
  },
});
