import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";
// eslint-disable-next-line import-x/no-named-as-default
import HeroInfo from "vuepress-theme-hope/components/HeroInfo.js";

import HopeLogo from "./HopeLogo.js";

const HopeHero: FunctionalComponent = (): VNode =>
  h(HeroInfo, {}, { logo: () => h(HopeLogo) });

HopeHero.displayName = "HopeHero";

export default HopeHero;
