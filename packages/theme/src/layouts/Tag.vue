<template>
  <main class="tag-list">
    <TagList />
    <template v-if="display">
      <ArticleList />
    </template>
  </main>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ArticleList from '@theme/components/ArticleList.vue';
import Pagination from '@theme/components/Pagination.vue';
import TagList from '@theme/components/TagList.vue';

@Component({ components: { ArticleList, Pagination, TagList } })
export default class Tag extends Vue {
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
.tag-list
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto 20px auto
  display block
</style>
