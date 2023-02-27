import { type FunctionalComponent, type VNode, h } from "vue";
import HeroInfo from "vuepress-theme-hope/components/HeroInfo.js";

import HopeLogo from "./HopeLogo.js";

const HopeHero: FunctionalComponent = (): VNode =>
  h(HeroInfo, {}, { heroImage: () => h(HopeLogo) });

HopeHero.displayName = "HopeHero";

export default HopeHero;
