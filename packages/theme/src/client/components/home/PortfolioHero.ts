import type { Slot } from "@vuepress/helper/client";
import { hasGlobalComponent, isString } from "@vuepress/helper/client";
import { watchImmediate } from "@vueuse/core";
import type { SlotsType, VNode } from "vue";
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  resolveComponent,
} from "vue";
import { useFrontmatter, withBase } from "vuepress/client";

import DropTransition from "@theme-hope/components/transitions/DropTransition";
import { useAuthorInfo } from "@theme-hope/composables/useAuthorInfo";
import type {
  PortfolioAvatarSlotData,
  PortfolioBackgroundSlotData,
  PortfolioInfoSlotData,
} from "@theme-hope/typings/slots";

import type { ThemePortfolioFrontmatter } from "../../../shared/index.js";

import "../../styles/home/portfolio-hero.scss";

export default defineComponent({
  name: "PortfolioHero",

  slots: Object as SlotsType<{
    portfolioInfo?: Slot<PortfolioInfoSlotData>;
    portfolioAvatar?: Slot<PortfolioAvatarSlotData>;
    portfolioBg?: Slot<PortfolioBackgroundSlotData>;
  }>,

  setup(_props, { slots }) {
    const authorInfo = useAuthorInfo();
    const frontmatter = useFrontmatter<ThemePortfolioFrontmatter>();

    const index = ref(0);
    const currentTitle = computed(
      () => frontmatter.value.titles?.[index.value] ?? "",
    );
    const title = ref("");

    const avatar = computed(() => {
      const { name, avatar, avatarDark, avatarAlt, avatarStyle } =
        frontmatter.value;

      return {
        name: name ?? authorInfo.value.name,
        avatar: avatar ? withBase(avatar) : null,
        avatarDark: avatarDark ? withBase(avatarDark) : null,
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        alt: (avatarAlt || name) ?? "",
        style: avatarStyle ?? null,
      };
    });

    const bg = computed(() => {
      const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;

      return {
        image: isString(bgImage) ? withBase(bgImage) : null,
        imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
        style: bgImageStyle ?? null,
      };
    });

    const info = computed(() => {
      const { welcome, name, titles = [], medias } = frontmatter.value;

      return {
        name: name ?? authorInfo.value.name,
        welcome: welcome ?? "👋 Hi There, I'm",
        title: title.value,
        titles: titles,
        medias: medias ?? null,
      };
    });

    const startTyping = () => {
      title.value = "";
      let charIndex = 0;
      let shouldStop = false;

      const typeNext = async (): Promise<void> => {
        if (!shouldStop) {
          title.value += currentTitle.value[charIndex];
          charIndex += 1;

          await nextTick();

          if (charIndex < currentTitle.value.length) {
            setTimeout(() => {
              void typeNext();
            }, 150);
          } else {
            const length = info.value.titles.length;

            setTimeout(() => {
              index.value =
                length <= 1 || index.value === info.value.titles.length - 1
                  ? 0
                  : index.value + 1;
            }, 1000);
          }
        }
      };

      void typeNext();

      return (): void => {
        shouldStop = true;
      };
    };

    let stop: (() => void) | null;

    onMounted(() => {
      watchImmediate(currentTitle, () => {
        stop?.();
        stop = startTyping();
      });
    });

    return (): VNode =>
      h(
        "section",
        {
          id: "portfolio",
          class: ["vp-portfolio", { bg: bg.value.image }],
        },
        [
          slots.portfolioBg?.(bg.value) ?? [
            bg.value.image
              ? h("div", {
                  class: ["vp-portfolio-mask", { light: bg.value.imageDark }],
                  style: [
                    {
                      background: `url(${bg.value.image}) center/cover no-repeat`,
                    },
                    bg.value.style,
                  ],
                })
              : null,
            bg.value.imageDark
              ? h("div", {
                  class: "vp-portfolio-mask dark",
                  style: [
                    {
                      background: `url(${bg.value.imageDark}) center/cover no-repeat`,
                    },
                    bg.value.style,
                  ],
                })
              : null,
          ],
          slots.portfolioAvatar?.(avatar.value) ??
            h("div", { class: "vp-portfolio-avatar" }, [
              h(DropTransition, { delay: 0.04 }, () => {
                const {
                  avatar: avatarLight,
                  avatarDark,
                  name: title,
                  alt,
                  style,
                } = avatar.value;

                return [
                  avatarLight
                    ? h("img", {
                        key: "light",
                        class: { light: avatarDark },
                        src: avatarLight,
                        title,
                        alt,
                        style,
                      })
                    : null,
                  avatarDark
                    ? h("img", {
                        key: "dark",
                        class: "dark",
                        src: avatarDark,
                        title,
                        alt,
                        style,
                      })
                    : null,
                ];
              }),
            ]),
          h(
            "div",
            { class: "vp-portfolio-container" },
            slots.portfolioInfo?.(info.value) ??
              h("div", { class: "vp-portfolio-info" }, [
                h(DropTransition, { appear: true, delay: 0.08 }, () =>
                  h(
                    "h6",
                    { class: "vp-portfolio-welcome" },
                    info.value.welcome,
                  ),
                ),
                h(DropTransition, { appear: true, delay: 0.12 }, () =>
                  h(
                    "h1",
                    { class: "vp-portfolio-name", id: "main-title" },
                    info.value.name,
                  ),
                ),
                h(DropTransition, { appear: true, delay: 0.16 }, () =>
                  h("h2", { class: "vp-portfolio-title" }, title.value),
                ),

                h(DropTransition, { appear: true, delay: 0.2 }, () =>
                  info.value.medias
                    ? h(
                        "div",
                        { class: "vp-portfolio-medias" },
                        info.value.medias.map(({ name, url, icon }) =>
                          h(
                            "a",
                            {
                              class: "vp-portfolio-media",
                              href: url,
                              rel: "noopener noreferrer",
                              target: "_blank",
                              title: name,
                            },
                            h(resolveComponent("VPIcon"), {
                              icon,
                              sizing: "both",
                            }),
                          ),
                        ),
                      )
                    : hasGlobalComponent("SocialMedias")
                      ? h(resolveComponent("SocialMedias"))
                      : null,
                ),
              ]),
          ),
        ],
      );
  },
});
