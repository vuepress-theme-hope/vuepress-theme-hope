import { withBase } from "@vuepress/client";
import { isLinkExternal } from "@vuepress/shared";
import {
  type PropType,
  type SlotsType,
  type VNode,
  defineComponent,
  h,
} from "vue";
import { RouterLink } from "vue-router";

import HopeIcon from "@theme-hope/components/HopeIcon";

import {
  type ThemeProjectHomeFeatureOptions,
  type ThemeProjectHomeItemOption,
} from "../../shared/index.js";

import "../styles/feature-panel.scss";

export default defineComponent({
  name: "FeaturePanel",

  props: {
    /**
     * Feature config
     */
    features: {
      type: Object as PropType<ThemeProjectHomeItemOption[]>,
      default: (): ThemeProjectHomeItemOption[] =>
        [] as ThemeProjectHomeItemOption[],
    },

    /**
     * Feature header
     */
    header: { type: String, default: "" },

    /**
     * Feature Section description
     */
    description: { type: String, default: "" },

    /**
     * Feature text color
     */
    color: { type: String, default: "" },

    /**
     * Feature Section image
     */
    image: { type: String, default: "" },

    /**
     * Feature Background image used in darkmode
     *
     * @default image
     */
    imageDark: { type: String, default: "" },

    /**
     * Feature Background image
     */
    bgImage: { type: String, default: "" },

    /**
     * Feature Background image used in darkmode
     *
     * @default bgImage
     */
    bgImageDark: { type: String, default: "" },

    /**
     * Feature Background image style
     */
    bgImageStyle: { type: [String, Object], default: "" },
  },

  slots: Object as SlotsType<{
    image?: (props: ThemeProjectHomeFeatureOptions) => VNode[] | VNode | null;
    info?: (props: ThemeProjectHomeFeatureOptions) => VNode[] | VNode | null;
    highlights?: (
      props: ThemeProjectHomeItemOption[]
    ) => VNode[] | VNode | null;
  }>,

  setup(props, { slots }) {
    return (): VNode => {
      const {
        bgImage,
        bgImageDark,
        bgImageStyle,
        color,
        description,
        image,
        imageDark,
        header,
        features,
      } = props;

      return h(
        "div",
        {
          class: "vp-feature-panel-wrapper",
        },
        [
          bgImage
            ? h("div", {
                class: ["vp-feature-bg", { light: bgImageDark }],
                style: [
                  { "background-image": `url(${bgImage})` },
                  bgImageStyle,
                ],
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
              class: "vp-feature-panel",
              style: color ? { color: color } : {},
            },
            [
              slots.image?.(props) || [
                image
                  ? h("img", {
                      class: ["vp-feature-image", { light: imageDark }],
                      src: withBase(image),
                      alt: header,
                    })
                  : null,
                imageDark
                  ? h("img", {
                      class: "vp-feature-image dark",
                      src: withBase(imageDark),
                      alt: header,
                    })
                  : null,
              ],

              slots.info?.(props) || [
                header ? h("h2", { class: "vp-feature-title" }, header) : null,
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
                    { class: "vp-features-wrapper" },
                    features.map(({ icon, title, details, link }) => {
                      const children = [
                        h("h3", { class: "vp-feature-header" }, [
                          h(HopeIcon, { icon }),
                          h("span", { innerHTML: title }),
                        ]),
                        h("p", {
                          class: "vp-feature-content",
                          innerHTML: details,
                        }),
                      ];

                      return link
                        ? isLinkExternal(link)
                          ? h(
                              "a",
                              {
                                class: "vp-feature link",
                                href: link,
                                role: "navigation",
                                "aria-label": title,
                                target: "_blank",
                              },
                              children
                            )
                          : h(
                              RouterLink,
                              {
                                class: "vp-feature link",
                                to: link,
                                role: "navigation",
                                "aria-label": title,
                              },
                              () => children
                            )
                        : h("div", { class: "vp-feature" }, children);
                    })
                  )
                : null,
            ]
          ),
        ]
      );
    };
  },
});
