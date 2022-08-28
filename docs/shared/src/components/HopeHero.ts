import { h } from "vue";
import type { FunctionalComponent, VNode } from "vue";

import HomeHero from "vuepress-theme-hope/components/HomeHero.js";
import HopeLogo from "./HopeLogo.js";

const HopeHero: FunctionalComponent = (): VNode =>
  h(HomeHero, {}, { heroImage: () => h(HopeLogo) });

HopeHero.displayName = "HopeHero";

export default HopeHero;
