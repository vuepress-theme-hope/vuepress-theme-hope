import { h } from "vue";
import { defineClientConfig } from "vuepress/client";
import { Blog } from "vuepress-theme-hope/blog";
import BingHeroBackground from "vuepress-theme-hope/presets/BingHeroBackground.js";
import HitokotoBlogHero from "vuepress-theme-hope/presets/HitokotoBlogHero.js";
import { setupRunningTimeFooter } from "vuepress-theme-hope/presets/footerRunningTime.js";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";

export default defineClientConfig({
  setup() {
    setupRunningTimeFooter(
      new Date("2022-01-01"),
      {
        "/": "Running time: :day days :hour hours :minute minutes :second seconds",
        "/zh/": "已运行 :day 天 :hour 小时 :minute 分钟 :second 秒",
      },
      true,
    );
    setupTransparentNavbar();
  },

  layouts: {
    Blog: () =>
      h(
        Blog,
        {},
        {
          heroInfo: (info: { text: string }) => h(HitokotoBlogHero, info),
          heroBg: () => h(BingHeroBackground),
        },
      ),
  },
});
