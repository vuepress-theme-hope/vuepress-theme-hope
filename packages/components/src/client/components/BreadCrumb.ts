import { usePageFrontmatter, usePagesData } from "@vuepress/client";
import { computed, defineComponent, h, onMounted, watch, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { getLinks } from "../composables";

import type { VNode } from "vue";

import "../styles/breadcrumb.scss";

interface BreadCrumbConfig {
  title: string;
  icon?: string;
  url: string;
}

export default defineComponent({
  name: "BreadCrumb",

  props: {
    show: {
      type: Boolean,
      default: true,
    },

    icon: {
      type: Boolean,
      default: true,
    },

    iconPrefix: {
      type: String,
      default: "",
    },
  },

  setup(props) {
    const pageFrontmatter = usePageFrontmatter();
    const pagesData = usePagesData();
    const route = useRoute();

    const config = ref<BreadCrumbConfig[]>([]);

    const enable = computed<boolean>(() => {
      const pageEnable = pageFrontmatter.value.breadcrumb;

      return (
        ((props.show && pageEnable !== false) || pageEnable === true) &&
        config.value.length > 1
      );
    });

    const iconEnable = computed<boolean>(() => {
      const pageEnable = pageFrontmatter.value.breadcrumbIcon;

      return (
        enable.value &&
        ((props.icon && pageEnable !== false) || pageEnable === true)
      );
    });

    const updateConfig = async (): Promise<void> => {
      const breadcrumbConfig: BreadCrumbConfig[] = [];
      const pages = pagesData.value;
      const links = getLinks(route);

      // generate breadcrumb config
      for (let index = 1; index < links.length; index++) {
        const page = await pages[links[index]]();

        breadcrumbConfig.push({
          title: page.title,
          icon: page.frontmatter.icon as string,
          url: page.path,
        });
      }

      if (breadcrumbConfig.length > 1) config.value = breadcrumbConfig;
    };

    watch(() => route.path, updateConfig);

    onMounted(() => {
      void updateConfig();
    });

    return (): VNode =>
      h(
        "nav",
        { class: { breadcrumb: true, disable: !enable.value } },
        enable.value
          ? h(
              "ol",
              {
                vocab: "https://schema.org/",
                typeof: "BreadcrumbList",
              },
              config.value.map((item, index) =>
                h(
                  "li",
                  {
                    class: { "is-active": config.value.length - 1 === index },
                    property: "itemListElement",
                    typeof: "ListItem",
                  },
                  h(
                    RouterLink,
                    {
                      to: item.url,
                      property: "item",
                      typeof: "WebPage",
                    },
                    [
                      // icon
                      item.icon && iconEnable.value
                        ? h("i", {
                            class: [
                              "iconfont",
                              `${props.iconPrefix}${item.icon}`,
                            ],
                          })
                        : null,
                      // text
                      h("span", { property: "name" }, item.title || "Unknown"),
                      // meta
                      h("meta", { property: "position", content: index + 1 }),
                    ]
                  )
                )
              )
            )
          : []
      );
  },
});
