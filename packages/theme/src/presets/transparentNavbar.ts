import { useEventListener, useStyleTag } from "@vueuse/core";
import { computed, nextTick, onMounted, watch } from "vue";
import { usePageFrontmatter, useRoute, useRouteLocale } from "vuepress/client";

import "./transparent-navbar.scss";

const BLOG_HOMEPAGE_STYLE = `\
.theme-container .vp-page.vp-portfolio-home,
.theme-container .vp-page.vp-blog-home {
  padding-top: 0;
}
.vp-blog-hero.fullscreen {
  height: 100vh;
}
`;

const HOMEPAGE_STYLE =
  BLOG_HOMEPAGE_STYLE +
  `\
.theme-container .vp-project-home {
  padding-top: 0;
}

.vp-hero-info-wrapper{
  padding-top: var(--navbar-height);
}
`;

const COLOR_SELECTORS = [
  ".vp-navbar",
  ".vp-site-name",
  ".vp-dropdown-title",
  ".vp-dropdown-subtitle",
  ".vp-navbar .auto-link",
  ".vp-navbar .auto-link.route-link-active",
  ".vp-action-link",
  ".vp-color-mode-switch",
  ".vp-outlook-button",
  ".search-pro-button",
  ".DocSearch-Button",
];

const BACKGROUND_SELECTORS = [
  ".vp-toggle-navbar-button .vp-top",
  ".vp-toggle-navbar-button .vp-middle",
  ".vp-toggle-navbar-button .vp-bottom",
  ".vp-toggle-sidebar-button .icon",
  ".vp-toggle-sidebar-button:before",
  ".vp-toggle-sidebar-button:after",
];

const encodeDataURI = (content: string): string =>
  content
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");

const getStyle = (color: string, parentSelector = ""): string =>
  `\
${COLOR_SELECTORS.map((item) => `${parentSelector} .transparent-navbar ${item}`).join(",")} {
  color: ${color};
}
${BACKGROUND_SELECTORS.map((item) => `${parentSelector} .transparent-navbar ${item}`).join(",")} {
  background: ${color};
}

${parentSelector}.transparent-navbar .dropdown-wrapper .dropdown-title > .arrow {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='${encodeDataURI(
    color,
  )}' d='M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z'/%3E%3C/svg%3E");
}
`;

export interface TransparentNavbarOptions {
  /**
   * @default 'blog-homepage'
   */
  type?: "homepage" | "blog-homepage" | "all";

  /**
   * Transparent threshold
   *
   * 透明的临界距离
   *
   * @default 50
   */
  threshold?: number;

  /**
   * Text color in lightmode
   *
   * 浅色模式下字体颜色
   */
  light?: string;

  /**
   * Text color in darkmode
   *
   * 深色模式下字体颜色
   */
  dark?: string;
}

/**
 * Transparent navbar if needed
 *
 * 将导航栏设置为透明
 */
export const setupTransparentNavbar = ({
  type,
  threshold = 50,
  light,
  dark,
}: TransparentNavbarOptions = {}): void => {
  const route = useRoute();
  const routeLocale = useRouteLocale();
  const frontmatter = usePageFrontmatter();

  const shouldTransparent = computed(
    type === "all"
      ? (): boolean => true
      : type === "homepage"
        ? (): boolean =>
            (frontmatter.value["home"] as boolean | undefined) ??
            route.path === routeLocale.value
        : (): boolean =>
            (frontmatter.value["portfolio"] as boolean | undefined) ??
            frontmatter.value.layout === "BlogHome",
  );

  const transparentNavbar = (): void => {
    if (window.scrollY < threshold && shouldTransparent.value) {
      document.body.classList.add("transparent-navbar");
    } else {
      document.body.classList.remove("transparent-navbar");
    }
  };

  useStyleTag(
    (type === "homepage" ? HOMEPAGE_STYLE : BLOG_HOMEPAGE_STYLE) +
      (light ? getStyle(light, "") : "") +
      (dark && light !== dark ? getStyle(dark, '[data-theme="dark"]') : ""),
  );
  useEventListener("scroll", transparentNavbar);

  watch(
    () => route.path,
    () => nextTick().then(transparentNavbar),
  );

  onMounted(() => {
    transparentNavbar();
  });
};
