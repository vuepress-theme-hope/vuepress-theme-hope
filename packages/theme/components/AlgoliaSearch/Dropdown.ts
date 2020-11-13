import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { AlgoliaOption } from "@mr-hope/vuepress-types";

@Component
export default class AlgoliaSearchDropdown extends Vue {
  @Prop({ type: Object, required: true }) options!: AlgoliaOption;

  private placeholder = "";

  @Watch("$lang")
  onLangChange(newValue: string): void {
    this.update(this.options, newValue);
  }

  @Watch("options")
  onOptionsChange(newValue: AlgoliaOption): void {
    this.update(newValue, this.$lang);
  }

  private mounted(): void {
    this.initialize(this.options, this.$lang);
    this.placeholder =
      (this.$site.themeConfig.searchPlaceholder as string) || "";
  }

  private initialize(userOptions: AlgoliaOption, lang: string): void {
    void Promise.all([
      import(
        /* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.js"
      ),
      import(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        /* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.css"
      ),
    ]).then(([docsearch]) => {
      // eslint-disable-next-line
      (docsearch as any).default({
        ...userOptions,
        inputSelector: "#algolia-search-input",
        // #697 Make docsearch work well at i18n mode.
        algoliaOptions: {
          facetFilters: [`lang:${lang}`].concat(
            ((userOptions as any).facetFilters as string[]) || []
          ),
        },
        handleSelected: (
          _input: HTMLInputElement,
          _event: Event,
          suggestion: { url: string }
        ) => {
          const { pathname, hash } = new URL(suggestion.url);
          const routepath = pathname.replace(this.$site.base, "/");

          void this.$router.push(`${routepath}${decodeURIComponent(hash)}`);
        },
      });
    });
  }

  private update(options: AlgoliaOption, lang: string): void {
    this.$el.innerHTML =
      '<input id="algolia-search-input" class="search-query">';
    this.initialize(options, lang);
  }
}
