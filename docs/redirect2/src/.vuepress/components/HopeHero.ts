import { defineComponent, h } from "vue";
import type { VNode } from "vue";

import HomeHero from "vuepress-theme-hope/lib/client/components/HomeHero";
import HopeLogo from "./HopeLogo";

export default defineComponent({
  name: "HopeHero",

  setup() {
    return (): VNode => h(HomeHero, {}, { heroImage: () => h(HopeLogo) });
  },
});
