<template>
  <Common :sidebar="false">
    <main class="blog-list">
      <component :is="componentName" v-if="componentName" />
      <h1 v-else>文章列表</h1>
      <ArticleList v-if="displayArticles" />
    </main>
  </Common>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import CategoryList from '@theme/components/CategoryList.vue';
import Common from '@theme/layouts/Common.vue';
import TagList from '@theme/components/TagList.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';

@Component({
  components: { ArticleList, CategoryList, Common, TagList }
})
export default class BlogEntry extends Vue {
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
