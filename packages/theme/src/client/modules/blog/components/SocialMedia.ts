import { type VNode, computed, defineComponent, h } from "vue";
import { entries } from "vuepress-shared/client";

import { icons } from "@temp/theme-hope/socialMedia";
import { usePure } from "@theme-hope/composables/index";
import { useBlogOptions } from "@theme-hope/modules/blog/composables/index";

import "../styles/social-media.scss";

export default defineComponent({
  name: "SocialMedia",

  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();

    const mediaLinks = computed(() => {
      const config = blogOptions.value.medias;

      return config
        ? entries(config).map(([media, url]) => ({
            name: media,
            icon: icons[media],
            url,
          }))
        : [];
    });

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "vp-social-medias" },
            mediaLinks.value.map(({ name, icon, url }) =>
              h("a", {
                class: "vp-social-media",
                href: url,
                rel: "noopener noreferrer",
                target: "_blank",
                "aria-label": name,
                ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
                innerHTML: icon,
              })
            )
          )
        : null;
  },
});
