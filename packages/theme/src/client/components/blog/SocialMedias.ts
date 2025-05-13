import { entries, isLinkHttp } from "@vuepress/helper/client";
import type { VNode } from "vue";
import { computed, defineComponent, h } from "vue";

import { icons } from "@temp/theme-hope/socialMedia.js";
import { useBlogOptions } from "@theme-hope/composables/blog/useBlogOptions";
import { usePure } from "@theme-hope/composables/usePure";

import "../../styles/blog/social-medias.scss";

export default defineComponent({
  name: "SocialMedias",

  setup() {
    const blogOptions = useBlogOptions();
    const isPure = usePure();

    const mediaLinks = computed(() =>
      entries(blogOptions.value.medias ?? {}).map(([media, config]) =>
        typeof config === "string"
          ? {
              name: media,
              icon: icons[media],
              link: config,
            }
          : { name: media, ...config },
      ),
    );

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "vp-social-medias" },
            mediaLinks.value.map(({ name, icon, link }) =>
              h("a", {
                class: "vp-social-media",
                href: link,
                rel: "noopener noreferrer",
                target: "_blank",
                "aria-label": name || "",
                ...(isPure.value ? {} : { "data-balloon-pos": "up" }),
                innerHTML: isLinkHttp(icon)
                  ? `<img class="vp-social-media-icon ${name}-icon" src="${icon}">`
                  : icon,
              }),
            ),
          )
        : null;
  },
});
