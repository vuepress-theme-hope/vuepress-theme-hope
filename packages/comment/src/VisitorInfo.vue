<template>
  <span class="visitor-info">
    <EyeIcon v-if="count < 1000" />
    <FireIcon v-else />
    <span :id="visitorID" :data-flag-title="$page.title" class="leancloud_visitors">
      <span class="leancloud-visitors-count">...</span>
    </span>
  </span>
</template>

<script lang="ts">
/* global COMMENT_OPTIONS */
import { Component, Vue, Watch } from 'vue-property-decorator';
import EyeIcon from '@mr-hope/vuepress-shared-utils/icons/EyeIcon.vue';
import FireIcon from '@mr-hope/vuepress-shared-utils/icons/FireIcon.vue';
import { Route } from 'vue-router';
import { ValineOptions } from '../types';

@Component({ components: { EyeIcon, FireIcon } })
export default class VisitorInfo extends Vue {
  private valineConfig: ValineOptions = COMMENT_OPTIONS;

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
  }

  /** 访问量 */
  private get enableVisitor() {
    if (!this.valineEnable) return false;
    const globalEnable = this.valineConfig.visitor !== false;
    const pageConfig = this.$frontmatter.visitor;

    return (globalEnable && pageConfig !== false) || pageConfig === true;
  }

  /** 访客标识符，使用当前网页路径 */
  private get visitorID() {
    const { base } = this.$site;

    return base
      ? `${base.slice(0, base.length - 1)}${this.$page.path}`
      : this.$page.path;
  }

  private mounted() {
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
    if (to.path !== from.path)
      setTimeout(() => {
        this.getCount();
      }, 500);
  }
}
</script>
