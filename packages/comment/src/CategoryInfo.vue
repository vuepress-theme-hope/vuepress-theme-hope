<template>
  <span v-if="$frontmatter.category"  class="category-info" :class="{ active }" @click="clickCategory">
    <CategoryIcon />
    <span v-text="category" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CategoryIcon from '@mr-hope/vuepress-shared-utils/icons/CategoryIcon.vue';
import { capitalize } from '@mr-hope/vuepress-shared-utils';

@Component({ components: { CategoryIcon } })
export default class CategoryInfo extends Vue {
  /** 分类 */
  private get category() {
    const { category } = this.$frontmatter;

    return category ? capitalize(category) : '';
  }

  private get active() {
    return this.$themeConfig.blog !== false;
  }

  // 跳转到分类页面
  private clickCategory() {
    const path = `/category/${this.$frontmatter.category}/`;

    if (this.active && this.$route.path !== path) this.$router.push(path);
  }
}
</script>

<style lang="stylus">
.category-info.active:hover
  cursor pointer
  color var(--accent-color, $accentColor)
</style>
