<template>
  <main class="category-list">
    <CategoryList />
    <template v-if="display">
      <ArticleList />
    </template>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import CategoryList from '@theme/components/CategoryList.vue';
import Pagination from '@theme/components/Pagination.vue';

@Component({ components: { ArticleList, CategoryList, Pagination } })
export default class Category extends Vue {
  get display() {
    const links = this.$route.path.split('/');

    return (
      (links.length === 3 && links[2] !== '') ||
      (links.length === 4 && links[3] === '')
    );
  }
}
</script>
<style lang="stylus" scoped>
.category-list
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto 20px auto
  display block
</style>
