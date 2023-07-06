import { withBase } from "@vuepress/client";
import type { FunctionalComponent, VNode } from "vue";
import { h } from "vue";
import { VPLink, isLinkExternal } from "vuepress-shared/client";

import HopeIcon from "@theme-hope/components/HopeIcon";

import type {
  ThemeProjectHomeHighlightItem,
  ThemeProjectHomeHighlightOptions,
} from "../../shared/index.js";

import "../styles/highlight-panel.scss";

const HighlightPanel: FunctionalComponent<
  ThemeProjectHomeHighlightOptions,
  Record<never, never>,
  {
    image?: (props: ThemeProjectHomeHighlightOptions) => VNode[] | VNode | null;
    info?: (props: ThemeProjectHomeHighlightOptions) => VNode[] | VNode | null;
    highlights?: (
      props: ThemeProjectHomeHighlightItem[],
    ) => VNode[] | VNode | null;
  }
> = (props, { slots }): VNode => {
  const {
    bgImage,
    bgImageDark,
    bgImageStyle,
    color,
    description,
    image,
    imageDark,
    header,
    highlights = [],
    type = "un-order",
  } = props;

  return h(
    "div",
    {
      class: "vp-highlight-wrapper",
      style: color ? { color: color } : {},
    },
    [
      bgImage
        ? h("div", {
            class: ["vp-highlight-bg", { light: bgImageDark }],
            style: [{ "background-image": `url(${bgImage})` }, bgImageStyle],
          })
        : null,
      bgImageDark
        ? h("div", {
            class: "vp-highlight-bg dark",
            style: [
              { "background-image": `url(${bgImageDark})` },
              bgImageStyle,
            ],
          })
        : null,

      h("div", { class: "vp-highlight" }, [
        slots.image?.(props) || [
          image
            ? h("img", {
                class: ["vp-highlight-image", { light: imageDark }],
                src: withBase(image),
                alt: header,
              })
            : null,
          imageDark
            ? h("img", {
                class: "vp-highlight-image dark",
                src: withBase(imageDark),
                alt: header,
              })
            : null,
        ],

        slots.info?.(props) || [
          h(
            "div",
            { class: "vp-highlight-info-wrapper" },
            h("div", { class: "vp-highlight-info" }, [
              header
                ? h("h2", {
                    class: "vp-highlight-header",
                    innerHTML: header,
                  })
                : null,
              description
                ? h("p", {
                    class: "vp-highlight-description",
                    innerHTML: description,
                  })
                : null,
              slots.highlights?.(highlights) ||
                h(
                  type === "order" ? "ol" : type === "no-order" ? "dl" : "ul",
                  { class: "vp-highlights" },
                  highlights.map(({ icon, title, details, link }) => {
                    const children = [
                      h(
                        type === "no-order" ? "dt" : "h3",
                        { class: "vp-highlight-title" },
                        [
                          icon
                            ? h(HopeIcon, {
                                class: "vp-highlight-icon",
                                icon,
                              })
                            : null,
                          h("span", { innerHTML: title }),
                        ],
                      ),
                      details
                        ? h(type === "no-order" ? "dd" : "p", {
                            class: "vp-highlight-details",
                            innerHTML: details,
                          })
                        : null,
                    ];

                    return h(
                      type === "no-order" ? "div" : "li",
                      {
                        class: ["vp-highlight-item-wrapper", { link }],
                      },
                      link
                        ? isLinkExternal(link)
                          ? h(
                              "a",
                              {
                                class: "vp-highlight-item link",
                                href: link,
                                role: "navigation",
                                "aria-label": title,
                                target: "_blank",
                              },
                              children,
                            )
                          : h(
                              VPLink,
                              {
                                class: "vp-highlight-item link",
                                to: link,
                                role: "navigation",
                                "aria-label": title,
                              },
                              () => children,
                            )
                        : h("div", { class: "vp-highlight-item" }, children),
                    );
                  }),
                ),
            ]),
          ),
        ],
      ]),
    ],
  );
};

HighlightPanel.displayName = "HighlightPanel";

export default HighlightPanel;
