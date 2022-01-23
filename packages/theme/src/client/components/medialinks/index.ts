import { computed, defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";

import { useThemeLocaleData, usePure } from "../../composables";

import { iconMap } from "./config";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  MediaType,
} from "../../../shared";

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
  "Github",
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

export default defineComponent({
  name: "MediaLinks",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocaleData = useThemeLocaleData();
    const isPure = usePure();

    const mediaLinks = computed(() => {
      const { medialinks } = frontmatter.value;

      const config =
        medialinks === false
          ? false
          : typeof medialinks === "object"
          ? medialinks
          : themeLocaleData.value.blog
          ? themeLocaleData.value.blog?.links || false
          : false;

      if (config) {
        const links: MediaLink[] = [];

        for (const media in config)
          if (medias.includes(media as MediaType))
            links.push({
              icon: media as MediaType,
              url: config[media as MediaType],
            });

        return links;
      }

      return [];
    });

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "media-links-wrapper" },
            mediaLinks.value.map((mediaLink) =>
              h(
                "a",
                {
                  class: "media-link",
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
