import Vue, { PropType } from "vue";
import { AlgoliaOption } from "@mr-hope/vuepress-types";
import { DocSearchProps } from "@docsearch/react";

export default Vue.extend({
  name: "AlgoliaSearchFull",

  props: {
    options: { type: Object as PropType<AlgoliaOption>, required: true },
  },

  watch: {
    $lang(newValue: string): void {
      this.update(this.options, newValue);
    },

    options(newValue: AlgoliaOption): void {
      this.update(newValue, this.$lang);
    },
  },

  mounted(): void {
    this.initialize(this.options, this.$lang);
  },

  methods: {
    initialize(userOptions: AlgoliaOption, _lang: string): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      void import(/* webpackChunkName: "docsearch" */ "@docsearch/js").then(
        (docsearch) => {
          // eslint-disable-next-line
          (docsearch as any).default({
            container: "#docsearch",
            placeholder:
              (this.$site.themeConfig.searchPlaceholder as string) || "",
            ...userOptions,
            searchParameters: userOptions.searchParameters || {},

            navigator: {
              navigate: ({ suggestionUrl }): void => {
                const { pathname: hitPathname } = new URL(
                  window.location.origin + suggestionUrl
                );
                // Vue Router doesn’t handle same-page navigation so we use
                // the native browser location API for anchor navigation.
                if (this.$route.path === hitPathname)
                  window.location.assign(
                    window.location.origin + suggestionUrl
                  );
                else void this.$router.push(suggestionUrl);
              },
              navigateNewTab({ suggestionUrl }): void {
                window.open(suggestionUrl);
              },
              navigateNewWindow({ suggestionUrl }): void {
                window.open(suggestionUrl);
              },
            },
            transformItems: (items) =>
              items.map((item) => ({
                ...item,
                url: this.getRelativePath(item.url),
              })),
            hitComponent: ({ hit, children }) => ({
              type: "a",
              key: null,
              ref: undefined,
              constructor: undefined,
              props: {
                href: hit.url,
                onClick: (event: Event): void => {
                  // We rely on the native link scrolling when user is
                  // already on the right anchor because Vue Router doesn’t
                  // support duplicated history entries.
                  if (this.$route.fullPath === hit.url) return;

                  const { pathname: hitPathname } = new URL(
                    `${window.location.origin}${hit.url}`
                  );
                  // If the hits goes to another page, we prevent the native link behavior
                  // to leverage the Vue Router loading feature.
                  if (this.$route.path !== hitPathname) event.preventDefault();

                  void this.$router.push(hit.url);
                },
                children,
              },
            }),
          } as DocSearchProps);
        }
      );
    },

    getRelativePath(absoluteUrl: string): string {
      const { pathname, hash } = new URL(absoluteUrl);
      const url = pathname.replace(this.$site.base, "/") + hash;
      return url;
    },

    update(options: AlgoliaOption, lang: string): void {
      this.$el.innerHTML = '<div id="docsearch"></div>';
      this.initialize(options, lang);
    },
  },
});
