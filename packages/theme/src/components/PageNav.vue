<template>
  <div v-if="prev || next" class="page-nav">
    <p class="inner">
      <span v-if="prev" class="prev">
        ←
        <a
          v-if="prev.type === 'external'"
          class="prev"
          :href="prev.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ prev.title || prev.path }}
          <OutboundLink />
        </a>

        <RouterLink v-else class="prev" :to="prev.path">{{ prev.title || prev.path }}</RouterLink>
      </span>

      <span v-if="next" class="next">
        <a
          v-if="next.type === 'external'"
          :href="next.path"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ next.title || next.path }}
          <OutboundLink />
        </a>

        <RouterLink v-else :to="next.path">{{ next.title || next.path }}</RouterLink>→
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { PageComputed, SiteData, ThemeConfig } from 'vuepress-types';
import {
  SidebarGroupItem,
  SidebarItem,
  resolvePageforSidebar
} from '@theme/util/sidebar';
import { Route } from 'vue-router';
import { resolvePath } from '@theme/util/path';

const getSidebarItems = (items: SidebarItem[], result: SidebarItem[]) => {
  for (const item of items)
    if (item.type === 'group')
      getSidebarItems((item as SidebarGroupItem).children || [], result);
    else result.push(item);
};

const find = (page: PageComputed, items: SidebarItem[], offset: -1 | 1) => {
  const result: SidebarItem[] = [];

  getSidebarItems(items, result);

  for (let i = 0; i < result.length; i++) {
    const cur = result[i];

    if (cur.type === 'page' && cur.path === decodeURIComponent(page.path))
      return result[i + offset];
  }

  return false;
};

interface LinkOptions {
  themeConfig: ThemeConfig;
  page: PageComputed;
  route: Route;
  site: SiteData;
  sidebarItems: SidebarItem[];
}

/** 处理页面链接 */
const resolvePageLink = (
  linkType: 'prev' | 'next',
  { themeConfig, page, route, site, sidebarItems }: LinkOptions
) => {
  const themeLinkConfig = themeConfig[`${linkType}Links`];
  const pageLinkConfig = page.frontmatter[linkType];

  if (themeLinkConfig === false || pageLinkConfig === false) return false;

  if (typeof pageLinkConfig === 'string')
    return resolvePageforSidebar(
      site.pages,
      resolvePath(pageLinkConfig, route.path)
    );

  return find(page, sidebarItems, linkType === 'prev' ? -1 : 1);
};

@Component
export default class PageNav extends Vue {
  @Prop(Array)
  private readonly sidebarItems!: SidebarItem[];

  private get prev() {
    return resolvePageLink('prev', {
      sidebarItems: this.sidebarItems,
      themeConfig: this.$themeConfig,
      page: this.$page,
      route: this.$route,
      site: this.$site
    });
  }

  private get next() {
    return resolvePageLink('next', {
      sidebarItems: this.sidebarItems,
      themeConfig: this.$themeConfig,
      page: this.$page,
      route: this.$route,
      site: this.$site
    });
  }
}
</script>

<style lang="stylus">
@require '~@theme/styles/wrapper.styl'

.page-nav
  @extend $wrapper
  padding-top 1rem
  padding-bottom 0

  .inner
    min-height 2rem
    margin-top 0
    border-top 1px solid $borderColor
    padding-top 1rem
    overflow auto // clear float

  .next
    float right
</style>
