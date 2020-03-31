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
          :class="item.icon && $themeConfig.breadcrumbIcon !== false? `${iconPrefix}${item.icon}`:''"
          @click="$router.push(item.url)"
          v-text="item.title"
        />
      </li>
    </ul>
  </nav>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

/** 路径导航配置 */
interface BreadCrumbConfig {
  /** 标题 */
  title: string;
  /** 图标 */
  icon?: string;
  /** 地址 */
  url: string;
}

@Component
export default class BreadCrumb extends Vue {
  /** 是否启用路径导航 */
  private get enable() {
    const globalEnable = this.$themeConfig.breadcrumb !== false;
    const pageEnable = this.$page.frontmatter.breadcrumb;

    return (
      ((globalEnable && pageEnable !== false) ||
        (!globalEnable && pageEnable === true)) &&
      this.config.length > 1
    );
  }

  /** 图标前缀 */
  private get iconPrefix() {
    const { iconPrefix } = this.$themeConfig;

    return typeof iconPrefix === 'string'
      ? iconPrefix
      : iconPrefix === false
      ? ''
      : 'icon-';
  }

  /** 路径导航配置 */
  private get config(): BreadCrumbConfig[] {
    /** 路径导航配置 */
    const breadcrumbConfig: BreadCrumbConfig[] = [];
    /** 页面对象 */
    const { pages } = this.$site;
    /** 页面路径 */
    const links = this.getLinks(this.$route);

    // 生成路径导航配置
    for (let index = 1; index < links.length; index++)
      for (let index2 = 0; index2 < pages.length; index2++) {
        const element = pages[index2];

        if (element.path === links[index]) {
          breadcrumbConfig.push({
            title: element.title,
            icon: element.frontmatter.icon,
            url: element.path
          });
          break;
        }
      }

    return breadcrumbConfig;
  }

  /** 生成页面路径链接 */
  private getLinks(route: Route) {
    /** 路径项 */
    const routePaths = route.fullPath.split('#')[0].split('/');
    /** 链接 */
    const links: string[] = [];
    let link = '';

    // 生成链接
    routePaths.forEach((element, index) => {
      if (index !== routePaths.length - 1) {
        link += `${element}/`;
        links.push(link);
      } else if (element !== '') {
        link += element;
        links.push(link);
      }
    });

    return links;
  }
}
</script>

<style lang="stylus">
@require '~@mr-hope/vuepress-shared-utils/src/styles/wrapper.styl'

// 修正标题的上边距
.theme-default-content:not(.custom)
  > *:first-child
    margin-top 0

h1, h2, h3, h4, h5, h6
  .theme-default-content:not(.custom) &:first-child
    margin-top 0.5rem - $navbarHeight !important
    padding-top $navbarHeight + 1rem !important

// 路径导航样式
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

  .iconfont
    font-size inherit

    &:before
      line-height 1
      vertical-align middle
      display inline-block

  @media (max-width: $MQNarrow)
    font-size 14px

  @media (max-width: $MQMobileNarrow)
    font-size 12.8px

  &.disable
    padding-bottom 1.3em

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
        color #7a7a7a
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
      color #b5b5b5
      content '\0002f'
</style>
