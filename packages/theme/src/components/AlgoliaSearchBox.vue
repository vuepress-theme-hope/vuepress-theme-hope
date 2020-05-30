<template>
  <form id="search-form" class="algolia-search-wrapper search-box" role="search">
    <input id="algolia-search-input" class="search-query" :placeholder="placeholder" />
  </form>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { AlgoliaOption } from "@mr-hope/vuepress-types";

@Component
export default class AlgoliaSearchBox extends Vue {
  @Prop({ type: Object, required: true }) options!: AlgoliaOption;

  private placeholder: string = "";

  @Watch("$lang")
  onLangChange(newValue: string) {
    this.update(this.options, newValue);
  }

  @Watch("options")
  onOptionsChange(newValue: AlgoliaOption) {
    this.update(newValue, this.$lang);
  }

  private mounted() {
    this.initialize(this.options, this.$lang);
    this.placeholder = this.$site.themeConfig.searchPlaceholder || "";
  }

  initialize(userOptions: AlgoliaOption, lang: string) {
    Promise.all([
      import(
        /* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.js"
      ),
      import(
        /* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.css"
      ),
    ]).then(([docsearch]) => {
      (docsearch as any)({
        ...userOptions,
        inputSelector: "#algolia-search-input",
        // #697 Make docsearch work well at i18n mode.
        algoliaOptions: {
          facetFilters: [`lang:${lang}`].concat(
            (userOptions as any).facetFilters || []
          ),
        },
        handleSelected: (
          _input: HTMLInputElement,
          _event: Event,
          suggestion: { url: string }
        ) => {
          const { pathname, hash } = new URL(suggestion.url);
          const routepath = pathname.replace(this.$site.base, "/");
          this.$router.push(`${routepath}${hash}`);
        },
      });
    });
  }

  update(options: AlgoliaOption, lang: string) {
    this.$el.innerHTML =
      '<input id="algolia-search-input" class="search-query">';
    this.initialize(options, lang);
  }
}
</script>

<style lang="stylus">
.algolia-search-wrapper
  & > span
    vertical-align middle

  .algolia-autocomplete
    line-height normal

    .ds-dropdown-menu
      min-width 515px !important
      margin 6px 0 0
      padding 4px
      border 1px solid var(--light-grey)
      border-radius 4px
      background-color var(--background-color)
      font-size 16px
      text-align left

      @media (max-width: $MQMobile)
        min-width calc(100vw - 4rem) !important
        max-width calc(100vw - 4rem) !important

      &:before
        border-color var(--light-grey)

      [class*=ds-dataset-]
        padding 0
        border none
        background var(--background-color)

      .ds-suggestions
        margin-top 0

      .ds-suggestion
        border-bottom 1px solid var(--border-color)

    .algolia-docsearch-suggestion--highlight
      color var(--accent-color)

    .algolia-docsearch-suggestion
      padding 0
      border-color var(--border-color)
      background var(--background-color)
      color var(--text-color)

      .algolia-docsearch-suggestion--category-header
        padding 5px 10px
        margin-top 0
        background var(--accent-color)
        color var(--white)
        font-weight 600

        .algolia-docsearch-suggestion--highlight
          background rgba(255, 255, 255, 0.6)

      .algolia-docsearch-suggestion--wrapper
        padding 0

        @media (max-width: $MQMobile)
          padding 5px 7px 5px 5px !important

      .algolia-docsearch-suggestion--title
        margin-bottom 0
        color var(--text-color)
        font-weight 600

      .algolia-docsearch-suggestion--subcategory-column
        vertical-align top
        padding 5px 7px 5px 5px
        border-color var(--border-color)
        background var(--background-color)
        color var(--text-color)

        @media (min-width: $MQMobile)
          display table-cell
          float none
          width 150px
          min-width 150px

        @media (max-width: $MQMobile)
          padding 0 !important
          background white !important

        &:after
          display none

      .algolia-docsearch-suggestion--subcategory-column-text
        color #555

        &:after
          @media (max-width: $MQMobile)
            display inline-block
            vertical-align middle
            content ' > '
            width 5px
            margin -3px 3px 0
            font-size 10px
            line-height 14.4px

      .algolia-docsearch-suggestion--content
        @media (min-width: $MQMobile)
          display table-cell
          float none
          vertical-align top
          width 100%

    .algolia-docsearch-footer
      border-color var(--border-color)

    .ds-cursor .algolia-docsearch-suggestion--content
      background-color var(--grey3)
      color var(--text-color)
</style>
