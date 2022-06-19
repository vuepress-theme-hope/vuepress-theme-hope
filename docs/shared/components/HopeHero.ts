import { h } from "vue";
import type { FunctionalComponent, VNode } from "vue";

import HomeHero from "vuepress-theme-hope/lib/client/components/HomeHero";
import HopeLogo from "./HopeLogo";

const HopeHero: FunctionalComponent = (): VNode =>
  h(HomeHero, {}, { heroImage: () => h(HopeLogo) });

HopeHero.displayName = "HopeHero";

export default HopeHero;
