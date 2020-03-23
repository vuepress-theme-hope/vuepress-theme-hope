<template>
  <div v-if="enable" class="pagation-wrapper">
    <div class="pagation-list">
      <div class="btn-group">
        <div
          v-if="currentPage > 1"
          class="btn"
          unselectable="on"
          @click="navigate(currentPage - 1)"
        >{{text.prev}}</div>
        <div v-if="displayLeftEllipsis" @click="navigate(1)">1</div>
        <div v-if="displayLeftEllipsis" class="ellipsis">...</div>
        <div
          v-for="num in indexs"
          :key="num"
          :class="{ active: currentPage === num }"
          @click="navigate(num)"
        >{{num}}</div>
        <div v-if="displayRightEllipsis && currentPage < totalPages - 3" class="ellipsis">...</div>
        <div
          v-if="displayRightEllipsis && currentPage < totalPages - 3"
          @click="navigate(totalPages)"
        >{{totalPages}}</div>
        <div
          v-if="currentPage < totalPages"
          class="btn"
          @click="navigate(currentPage + 1)"
        >{{text.next}}</div>
      </div>
      <div class="text">{{text.navigate}}:&nbsp;</div>
      <input v-model="input" type="text" @keypress.enter="jumpPage(input)" />
      <div class="navigateBtn" @click="jumpPage(input)">{{text.button}}</div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component
export default class Pagination extends Vue {
  @Prop({ type: Number, default: 10 })
  /** 总共的项目 */
  private readonly total!: number;

  @Prop({ type: Number, default: 10 })
  /** 每页包含的项目 */
  private readonly perPage!: number;

  @Model('change', { type: Number })
  /** 当前页 */
  private readonly currentPage!: number;

  private input = '';

  /** 总共的页码数 */
  private get totalPages() {
    return Math.ceil(this.total / this.perPage);
  }

  /** 是否启用插件 */
  private get enable() {
    return this.totalPages && this.totalPages !== 1;
  }

  private get displayLeftEllipsis() {
    if (this.totalPages <= 5) return false;

    return this.currentPage > 4;
  }

  private get displayRightEllipsis() {
    if (this.totalPages <= 5) return false;

    return this.currentPage <= this.totalPages - 3;
  }

  /** 获得页码索引 */
  private get indexs() {
    let min = 1;
    let max = this.totalPages;
    const arr = [];

    if (this.totalPages >= 7)
      if (this.currentPage > 4 && this.currentPage < this.totalPages - 3) {
        min = Number(this.currentPage) - 2;
        max = Number(this.currentPage) + 2;
      } else if (this.currentPage <= 4) {
        min = 1;
        max = 5;
      } else {
        max = this.totalPages;
        min = this.totalPages - 4;
      }

    // 生成页码索引
    for (let i = min; i <= max; i++) arr.push(i);

    return arr;
  }

  private get text() {
    return (
      this.$themeLocaleConfig.pagination || i18n.getDefaultLocale().pagination
    );
  }

  /** 页码跳转 */
  private navigate(index: number) {
    this.$emit('change', index);
  }

  /** 跳转到特定页面 */
  private jumpPage(index: string) {
    const pageNum = parseInt(index);

    if (pageNum <= this.totalPages && pageNum > 0) this.navigate(pageNum);
    else {
      const errorText = this.text.errorText.split('$page');
      // eslint-disable-next-line no-alert
      alert(`${errorText[0]}${this.totalPages + 1}${errorText[1]}`);
    }
  }
}
</script>

<style lang="stylus">
.pagation-wrapper
  font-weight 600
  margin 20px auto 12px

  .pagation-list
    display flex
    justify-content center
    align-items center
    -webkit-touch-callout none
    user-select none
    flex-wrap wrap

    .btn-group
      display flex
      align-items stretch
      border 1px solid #ccc
      border-radius 4px
      overflow hidden

      div
        position relative
        padding 5px 8px
        font-size 14px
        color $accentColor
        cursor pointer

        &::before
          content ' '
          position absolute
          top 0
          left 0
          bottom 0
          width 1px
          background-color #ccc

        &:first-child
          &::before
            background-color transparent

        &:hover, &.active
          background $accentColor
          color #fff

          &::before
            background-color $accentColor

        &.active + div, &:hover + div
          &::before
            background-color $accentColor

        &.active, &.ellipsis
          cursor default

    div.text
      font-size 14px
      margin-left 24px

    input
      width 55px
      height 24px
      font-size 13px
      border 1px solid #ccc
      border-radius 4px
      outline none
      text-align center
      margin 6px 0

    .navigateBtn
      font-size 14px
      margin-left 5px
      padding 4px 8px
      border 1px solid #ccc
      border-radius 4px
      overflow hidden
      cursor pointer

      &:hover
        color #fff
        background $accentColor
        border-color $accentColor
</style>
