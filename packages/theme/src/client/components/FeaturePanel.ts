import { isLinkExternal } from "@vuepress/helper/client";
import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";
import { RouteLink, withBase } from "vuepress/client";

import HopeIcon from "@theme-hope/components/HopeIcon";

import type {
  ThemeProjectHomeFeatureOptions,
  ThemeProjectHomeHighlightItem,
} from "../../shared/index.js";

import "../styles/feature-panel.scss";

const FeaturePanel: FunctionalComponent<
  ThemeProjectHomeFeatureOptions,
  Record<never, never>,
  {
    image?: (props: ThemeProjectHomeFeatureOptions) => VNode[] | VNode | null;
    info?: (props: ThemeProjectHomeFeatureOptions) => VNode[] | VNode | null;
    highlights?: (
      props: ThemeProjectHomeHighlightItem[],
    ) => VNode[] | VNode | null;
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
          slots.image?.(props) || [
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

          slots.info?.(props) || [
            header ? h("h2", { class: "vp-feature-header" }, header) : null,
            description
              ? h("p", {
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
                      h(HopeIcon, { icon }),
                      h("span", { innerHTML: title }),
                    ]),
                    h("p", {
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

FeaturePanel.displayName = "FeaturePanel";

export default FeaturePanel;
