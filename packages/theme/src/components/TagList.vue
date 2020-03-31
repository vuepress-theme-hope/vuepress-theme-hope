<template>
  <ul class="tag-list-wrapper">
    <li
      v-for="(tag, index) in tagList"
      :key="tag.path"
      class="tag"
      :class="{ active: isActive(tag.name) }"
      :style="{ backgroundColor: color(index) }"
      @click="clickTag(tag.path)"
    >
      <div class="tag-name">{{ tag.name }}</div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { i18n } from '@mr-hope/vuepress-shared-utils';
import navigate from '@theme/util/navigate';

@Component
export default class TagList extends Vue {
  /** 标签列表 */
  private get tagList() {
    return [
      {
        name:
          this.$themeLocaleConfig.allText || i18n.getDefaultLocale().allText,
        path: '/tag/'
      },
      ...this.$tag.list
    ];
  }

  /** 是否激活 */
  private isActive(name: string) {
    return (
      name ===
      (this.$currentTag?.key ||
        this.$themeLocaleConfig.allText ||
        i18n.getDefaultLocale().allText)
    );
  }

  /** 点击标签导航 */
  private clickTag(path: string) {
    navigate(path, this.$router, this.$route);
  }

  /** 标签颜色 */
  private color(index: number) {
    const colors = [
      '#e74c3c',
      '#8e44ad',
      '#27ae60',
      '#e67e22',
      '#16a085',
      '#2c3e50',
      '#f39c12',
      '#2ecc71'
    ];
    const finalIndex = index % colors.length;

    return colors[finalIndex];
  }
}
</script>

<style lang="stylus">
.tag-list-wrapper
  list-style none
  padding-left 0

  .tag
    display inline-block
    position relative
    vertical-align middle
    margin 4px 6px
    cursor pointer
    font-size 12px
    border-radius 14px
    box-shadow 0 1px 6px 0 rgba(0, 0, 0, 0.2)
    overflow hidden
    transition all 0.5s
    padding 3px 8px
    color #fff

    &:hover
      top 0.5px
      left 0.5px

    &.active
      padding 4px 10px
</style>
