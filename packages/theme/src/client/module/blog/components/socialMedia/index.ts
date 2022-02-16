import { computed, defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";

import { iconMap } from "./config";

import { usePure } from "@theme-hope/composables";
import { useBlogOptions } from "@theme-hope/module/blog/composables";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  MediaType,
} from "../../../../../shared";

const medias: MediaType[] = [
  "Baidu",
  "Bitbucket",
  "Dingding",
  "Discord",
  "Dribbble",
  "Email",
  "Evernote",
  "Facebook",
  "Flipboard",
  "Gitee",
  "GitHub",
  "Gitlab",
  "Gmail",
  "Instagram",
  "Lines",
  "Linkedin",
  "Pinterest",
  "Pocket",
  "QQ",
  "Qzone",
  "Reddit",
  "Rss",
  "Steam",
  "Twitter",
  "Wechat",
  "Weibo",
  "Whatsapp",
  "Youtube",
  "Zhihu",
];

interface MediaLink {
  icon: MediaType;
  url: string;
}

import "../../styles/social-media.scss";

export default defineComponent({
  name: "SocialMedia",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const blogOptions = useBlogOptions();
    const isPure = usePure();

    const mediaLinks = computed(() => {
      const { socialMedia } = frontmatter.value;

      const config =
        socialMedia === false ? false : blogOptions.value.medias || false;

      if (config) {
        const links: MediaLink[] = [];

        for (const media in config) {
          const url = config[media as MediaType];

          if (medias.includes(media as MediaType) && url)
            links.push({ icon: media as MediaType, url });
        }

        return links;
      }

      return [];
    });

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "social-media-wrapper" },
            mediaLinks.value.map((mediaLink) =>
              h(
                "a",
                {
                  class: "social-media",
                  href: mediaLink.url,
                  rel: "noopener noreferrer",
                  target: "_blank",
                  ariaLabel: mediaLink.icon,
                  ...(isPure.value ? { "data-balloon-pos": "up" } : {}),
                },
                [
                  h("span", { class: "sr-only" }, mediaLink.icon),
                  h(iconMap[mediaLink.icon]),
                ]
              )
            )
          )
        : null;
  },
});
