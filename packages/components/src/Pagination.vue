<template>
  <div v-if="enable" class="pagation-wrapper">
    <div class="pagation-list">
      <div class="btn-group">
        <div
          v-if="currentPage > 1"
          class="btn"
          unselectable="on"
          @click="navigate(currentPage - 1)"
        >{{i18n.prev}}</div>
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
        >{{i18n.next}}</div>
      </div>
      <div class="navigate-wrapper">
        <div class="text">{{i18n.navigate}}:&nbsp;</div>
        <input v-model="input" type="text" @keypress.enter="jumpPage(input)" />
        <div class="navigate-button" @click="jumpPage(input)">{{i18n.button}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Model, Prop, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { i18n } from '@mr-hope/vuepress-shared-utils';

@Component
export default class Pagination extends Vue {
  @Prop({ type: Number, default: 10 })
  /** Number of total items */
  private readonly total!: number;

  @Prop({ type: Number, default: 10 })
  /** Items per page */
  private readonly perPage!: number;

  @Model('change', { type: Number })
  private readonly currentPage!: number;

  private input = '';

  private get totalPages() {
    return Math.ceil(this.total / this.perPage);
  }

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

  /** Page indexs */
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

    // Generate page index
    for (let i = min; i <= max; i++) arr.push(i);

    return arr;
  }

  private get i18n() {
    return (
      i18n.getLocale(this.$lang).pagination ||
      i18n.getDefaultLocale().pagination
    );
  }

  private mounted() {
    const { index } = this.$route.query;

    this.navigate(index ? Number(index) : 1);
  }

  /** Navigate to certain page */
  private navigate(index: number) {
    const path = `${this.$route.path}?index=${index}`;

    this.$emit('change', index);
    if (this.$route.fullPath !== path) this.$router.push(path);
  }

  /** Check and navigate to certain page */
  private jumpPage(index: string) {
    const pageNum = parseInt(index);

    if (pageNum <= this.totalPages && pageNum > 0) this.navigate(pageNum);
    else {
      const errorText = this.i18n.errorText.split('$page');
      // eslint-disable-next-line no-alert
      alert(`${errorText[0]}${this.totalPages}${errorText[1]}`);
    }
  }
}
</script>

<style lang="stylus">
.pagation-wrapper
  font-weight 600
  margin 20px auto 12px

  @media (max-width: $MQMobileNarrow)
    margin 20px -1.5rem 12px

  .pagation-list
    display flex
    justify-content space-evenly
    align-items center
    -webkit-touch-callout none
    user-select none
    flex-wrap wrap

    .btn-group
      display flex
      align-items stretch
      margin 0 8px
      border 1px solid var(--border-color, $borderColor)
      border-radius 4px
      overflow hidden

      div
        position relative
        padding 5px 8px
        font-size 14px
        color var(--accent-color, $accentColor)
        cursor pointer

        &::before
          content ' '
          position absolute
          top 0
          left 0
          bottom 0
          width 1px
          background-color var(--border-color, $borderColor)

        &:first-child
          &::before
            background-color transparent

        &:hover, &.active
          background var(--accent-color, $accentColor)
          color var(--white, #fff)

          &::before
            background-color var(--accent-color, $accentColor)

        &.active + div, &:hover + div
          &::before
            background-color var(--accent-color, $accentColor)

        &.active, &.ellipsis
          cursor default

    .navigate-wrapper
      display flex
      justify-content center
      align-items center
      margin 0 8px

      div.text
        font-size 14px

      input
        width 55px
        height 24px
        font-size 13px
        border 1px solid var(--border-color, $borderColor)
        border-radius 4px
        outline none
        text-align center
        margin 6px 0
        color var(--black, #000)
        background-color var(--background-color, #fff)

      .navigate-button
        font-size 14px
        margin-left 5px
        padding 4px 8px
        border 1px solid var(--border-color, $borderColor)
        border-radius 4px
        overflow hidden
        cursor pointer

        &:hover
          color var(--white, #fff)
          background var(--accent-color, $accentColor)
          border-color var(--accent-color, $accentColor)
</style>
