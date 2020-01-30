<!--
 * @Author: Mr.Hope
 * @Date: 2019-10-10 09:51:24
 * @LastEditors  : Mr.Hope
 * @LastEditTime : 2020-01-30 18:30:33
 * @Description: 页面信息
-->
<template>
  <div class="page-title">
    <h1>{{ $page.title }}</h1>
    <div v-if="enable" class="page-info">
      <!-- 作者 -->
      <template v-if="author">
        <AuthorIcon />
        <span v-text="author" />
      </template>

      <!-- 访客 -->
      <template v-if="enableVisitor">
        <EyeIcon v-if="count < 1000" />
        <FireIcon v-else />
        <span :id="visitorID" :data-flag-title="$page.title" class="leancloud_visitors">
          <span :style="numStyle" class="leancloud-visitors-count">...</span>
        </span>
      </template>

      <!-- 时间 -->
      <template v-if="time">
        <TimeIcon />
        <span v-text="time" />
      </template>

      <!-- 分类 -->
      <template v-if="category">
        <CategoryIcon />
        <span v-text="category" />
      </template>

      <!-- 标签 -->
      <template v-if="tag">
        <TagIcon />
        <span v-if="typeof tag === 'string'">{{tag}}</span>
        <span v-else>
          <template v-for="item in tag">{{item}}&nbsp;</template>
        </span>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
/* global COMMENT_OPTIONS */
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AuthorIcon from '@mr-hope/vuepress-shared-utils/icons/AuthorIcon.vue';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import EyeIcon from '@mr-hope/vuepress-shared-utils/icons/EyeIcon.vue';
import FireIcon from '@mr-hope/vuepress-shared-utils/icons/FireIcon.vue';
import { Route } from 'vue-router';
import TagIcon from '@mr-hope/vuepress-shared-utils/icons/TagIcon.vue';
import TimeIcon from '@mr-hope/vuepress-shared-utils/icons/TimeIcon.vue';
import { ValineOptions } from '../types';
import { capitalize } from '@mr-hope/vuepress-shared-utils';

@Component({ components: { AuthorIcon, CategoryIcon, EyeIcon, FireIcon, TagIcon, TimeIcon } })
export default class PageInfo extends Vue {
  private valineConfig: ValineOptions = COMMENT_OPTIONS;

  private numStyle = { color: '#999' };

  /** 访问量 */
  private count = 0;

  /** 是否启用 Valine */
  private get valineEnable() {
    const { valineConfig } = this;

    return Boolean(
      valineConfig &&
      valineConfig.type === 'valine' &&
      valineConfig.appId &&
      valineConfig.appKey
    );
  };

  /** 作者 */
  private get author() {
    const { author } = this.$frontmatter;

    return (author as string) || (author === false ? '' : this.valineConfig.author || '');
  }

  /** 访问量 */
  private get enableVisitor() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.visitor !== false;
    const pageConfig = this.$frontmatter.visitor;

    return (
      (globalEnable && pageConfig !== false) ||
      (!globalEnable && pageConfig === true)
    );
  }

  /** 访客标识符，使用当前网页路径 */
  private get visitorID() {
    const { base } = this.$site;

    return base ? `${base.slice(0, base.length - 1)}${this.$page.path}` : this.$page.path;
  }

  /** 发表时间 */
  private get time() {
    const { time } = this.$frontmatter;

    if (time) {
      if (time.indexOf('T') !== -1) {
        const [date, temp] = time.split('T');
        const [moment] = temp.split('.');

        return `${date} ${moment === '00:00:00' ? '' : moment}`;
      }

      return time;
    }

    return '';
  }

  /** 是否显示 PageInfo */
  private get enable() {
    const pluginEnable = this.$themeConfig.pageInfo !== false;
    const pageEnable = this.$page.frontmatter.pageInfo;

    return (
      (pluginEnable && pageEnable !== false) ||
      (!pluginEnable && pageEnable === true)
    ) && (this.author || this.enableVisitor || this.time);
  }

  /** 分类 */
  private get category() {
    const { category } = this.$frontmatter;

    return category ? capitalize(category) : '';
  }

  /** 标签 */
  private get tag() {
    const { tags, tag = tags } = this.$frontmatter;

    if (typeof tag === 'string') return capitalize(tag);

    if (Array.isArray(tag)) return tag.map(item => capitalize(item));

    return '';
  }

  private mounted() {
    if (this.valineEnable)
      setTimeout(() => {
        this.getCount();
      }, 1500);
  }

  // 获得评论并根据数量显示火热图标
  private getCount() {
    const countElement = document.querySelector(
      '.leancloud_visitors .leancloud-visitors-count'
    );

    if (countElement) {
      const count = countElement.textContent;

      if (count && !isNaN(Number(count))) this.count = Number(count);
    } else
      setTimeout(() => {
        this.getCount();
      }, 500);
  }

  @Watch('$route')
  onRouteChange(to: Route, from: Route) {
    if (to.path !== from.path && this.valineEnable)
      setTimeout(() => {
        this.getCount();
      }, 500);
  }
}
</script>

<style lang="stylus">
@require '~@vuepress/theme-default/styles/wrapper.styl'

.page
  .page-title
    @extend $wrapper
    padding-bottom 0

  .page-title + .theme-default-content:not(.custom)
    padding-top 0

  .page-info
    color desaturate(lighten($textColor, 25%), 25%)
    display flex
    align-items center
    font-size 15px
    color #777

    .icon
      width 16px
      height 16px
      margin 0 6px 0 10px

      &:first-child
        margin-left 0

      h1
        margin-top -3.1rem !important
        padding-top 4.6rem !important
        margin-bottom 1rem

  .theme-default-content:not(.custom) h1:first-child
    display none
</style>
