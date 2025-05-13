import type { Slot } from "@vuepress/helper/client";
import { isLinkExternal } from "@vuepress/helper/client";
import type { FunctionalComponent } from "vue";
import { h, resolveComponent } from "vue";
import { RouteLink, withBase } from "vuepress/client";

import type {
  ThemeProjectHomeFeatureOptions,
  ThemeProjectHomeHighlightItem,
} from "../../../shared/index.js";

import "../../styles/home/feature-panel.scss";

const FeatureSection: FunctionalComponent<
  ThemeProjectHomeFeatureOptions,
  Record<never, never>,
  {
    image?: Slot<ThemeProjectHomeFeatureOptions>;
    info?: Slot<ThemeProjectHomeFeatureOptions>;
    highlights?: Slot<ThemeProjectHomeHighlightItem[]>;
  }
> = (props, { slots }) => {
  const {
    bgImage,
    bgImageDark,
    bgImageStyle,
    color,
    description,
    image,
    imageDark,
    header,
    features = [],
  } = props;

  return h(
    "div",
    {
      class: "vp-feature-wrapper",
    },
    [
      bgImage
        ? h("div", {
            class: ["vp-feature-bg", { light: bgImageDark }],
            style: [{ "background-image": `url(${bgImage})` }, bgImageStyle],
          })
        : null,
      bgImageDark
        ? h("div", {
            class: "vp-feature-bg dark",
            style: [
              { "background-image": `url(${bgImageDark})` },
              bgImageStyle,
            ],
          })
        : null,
      h(
        "div",
        {
          class: "vp-feature",
          style: color ? { color } : {},
        },
        [
          slots.image?.(props) ?? [
            image
              ? h("img", {
                  class: ["vp-feature-image", { light: imageDark }],
                  src: withBase(image),
                  alt: "",
                })
              : null,
            imageDark
              ? h("img", {
                  class: "vp-feature-image dark",
                  src: withBase(imageDark),
                  alt: "",
                })
              : null,
          ],

          slots.info?.(props) ?? [
            header ? h("h2", { class: "vp-feature-header" }, header) : null,
            description
              ? h("div", {
                  class: "vp-feature-description",
                  innerHTML: description,
                })
              : null,
          ],
          features.length
            ? h(
                "div",
                { class: "vp-features" },
                features.map(({ icon, title, details, link }) => {
                  const children = [
                    h("h3", { class: "vp-feature-title" }, [
                      h(resolveComponent("VPIcon"), { icon }),
                      h("span", { innerHTML: title }),
                    ]),
                    h("div", {
                      class: "vp-feature-details",
                      innerHTML: details,
                    }),
                  ];

                  return link
                    ? isLinkExternal(link)
                      ? h(
                          "a",
                          {
                            class: "vp-feature-item link",
                            href: link,
                            "aria-label": title,
                            target: "_blank",
                          },
                          children,
                        )
                      : h(
                          RouteLink,
                          {
                            class: "vp-feature-item link",
                            to: link,
                            "aria-label": title,
                          },
                          () => children,
                        )
                    : h("div", { class: "vp-feature-item" }, children);
                }),
              )
            : null,
        ],
      ),
    ],
  );
};

FeatureSection.displayName = "FeaturePanel";

export default FeatureSection;
