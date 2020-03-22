<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <!-- 密码弹窗 -->
    <Password v-if="globalEncrypted" @enter="globalPasswordCheck" />
    <!-- 内容 -->
    <template v-else>
      <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="[]" @toggle-sidebar="toggleSidebar">
        <slot slot="top" name="sidebar-top" />
        <slot slot="bottom" name="sidebar-bottom" />
      </Sidebar>

      <main class="blog-list">
        <component :is="componentName" v-if="componentName" />
        <h1 v-else>文章列表</h1>
        <ArticleList v-if="displayArticles" />
      </main>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import CategoryList from '@theme/components/CategoryList.vue';
import Navbar from '@theme/components/Navbar.vue';
import Password from '@theme/components/Password.vue';
import Sidebar from '@theme/components/Sidebar.vue';
import TagList from '@theme/components/TagList.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';
import globalEncryptMixin from '@theme/util/globalEncryptMixin';
import layoutMixin from '@theme/util/layoutMixin.ts';

@Component({
  components: { ArticleList, CategoryList, Password, Sidebar, Navbar, TagList }
})
export default class BlogEntry extends Mixins(globalEncryptMixin, layoutMixin) {
  /** 是否显示文章 */
  private get displayArticles() {
    const { path } = this.$route;

    return path !== '/category/' && path !== '/category';
  }

  /** 组件名称 */
  private get componentName() {
    const pathName = capitalize(this.$route.path.split('/')[1]);

    if (['Category', 'Tag'].includes(pathName)) return `${pathName}List`;

    return '';
  }

  /** 是否应该展示侧边栏 */
  protected get shouldShowSidebar(): boolean {
    return false;
  }
}
</script>

<style lang="stylus" scoped>
.tags-wrapper
  max-width 740px
  margin 0 auto
  padding 4.6rem 2.5rem 0

.blog-list
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto 20px auto
  display block

@media (max-width: $MQMobile)
  .tags-wrapper
    padding 5rem 0.6rem 0
</style>
