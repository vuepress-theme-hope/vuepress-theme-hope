<template>
  <nav :class="['breadcrumb',{ disable: !enable }]">
    <ul v-if="enable">
      <li
        v-for="(item,index) in config"
        :key="item.url"
        :class="{'is-active': config.length -1 === index}"
      >
        <a
          class="iconfont"
          :class="item.icon && iconEnable? `${iconPrefix}${item.icon}`:''"
          @click="$router.push(item.url)"
          v-text="item.title"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";

interface BreadCrumbConfig {
  title: string;
  icon?: string;
  url: string;
}

@Component
export default class BreadCrumb extends Vue {
  private get enable(): boolean {
    const globalEnable = this.$themeConfig.breadcrumb !== false;
    const pageEnable = this.$page.frontmatter.breadcrumb;

    return (
      ((globalEnable && pageEnable !== false) || pageEnable === true) &&
      this.config.length > 1
    );
  }

  private get iconEnable(): boolean {
    const globalEnable = this.$themeConfig.breadcrumbIcon !== false;
    const pageEnable = this.$page.frontmatter.breadcrumbIcon;

    return (
      this.enable &&
      ((globalEnable && pageEnable !== false) || pageEnable === true)
    );
  }

  private get iconPrefix(): string {
    const { iconPrefix } = this.$themeConfig;

    return iconPrefix === "" ? "" : iconPrefix || "icon-";
  }

  private get config(): BreadCrumbConfig[] {
    const breadcrumbConfig: BreadCrumbConfig[] = [];
    const { pages } = this.$site;
    const links = this.getLinks(this.$route);

    // generate breadcrumb config
    for (let index = 1; index < links.length; index++)
      for (let index2 = 0; index2 < pages.length; index2++) {
        const element = pages[index2];

        if (element.path === links[index]) {
          breadcrumbConfig.push({
            title: element.title,
            icon: element.frontmatter.icon,
            url: element.path,
          });
          break;
        }
      }

    return breadcrumbConfig;
  }

  private getLinks(route: Route) {
    const routePaths = route.fullPath.split("#")[0].split("/");
    const links: string[] = [];
    let link = "";

    // generate links
    routePaths.forEach((element, index) => {
      if (index !== routePaths.length - 1) {
        link += `${element}/`;
        links.push(link);
      } else if (element !== "") {
        link += element;
        links.push(link);
      }
    });

    return links;
  }
}
</script>

<style lang="stylus">
@require '~@mr-hope/vuepress-shared-utils/styles/wrapper.styl'

// Fix top boarder of heading1
.theme-default-content:not(.custom)
  > *:first-child
    margin-top 0

h1, h2, h3, h4, h5, h6
  .theme-default-content:not(.custom) &:first-child
    margin-top 0.5rem - $navbarHeight !important
    padding-top $navbarHeight + 1rem !important

.breadcrumb
  @extend $wrapper
  position relative
  z-index 2
  font-size 15px
  white-space nowrap
  margin-top $navbarHeight
  padding-top 0.2rem
  margin-bottom - $navbarHeight
  padding-bottom 0.2rem

  @media (max-width: $MQNarrow)
    font-size 14px

  @media (max-width: $MQMobileNarrow)
    font-size 12.8px

  // breadcrumb is disabled
  &.disable
    padding-bottom 1.3em

  .iconfont
    font-size inherit

    &:before
      line-height 1
      vertical-align middle
      display inline-block

  ul
    list-style none
    padding-left 0px
    align-items flex-start
    display flex
    flex-wrap wrap
    justify-content flex-start

    li
      align-items center
      display flex

      &:first-child a
        padding-left 0

      &:last-child a
        padding-right 0

      &.is-active a
        color var(--light-grey, #999)
        cursor default
        pointer-events none

      a
        padding 0 0.5em

        &:before
          margin-right 0.25em

        &:hover
          cursor pointer
          text-decoration underline

    li+li::before
      color var(--light-grey, #999)
      content '\0002f'
</style>
