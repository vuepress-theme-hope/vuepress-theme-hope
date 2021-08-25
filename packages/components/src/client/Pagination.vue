<template>
  <div class="pagination-wrapper">
    <div v-if="enable" class="pagination-list">
      <div class="btn-group">
        <div
          v-if="currentPage > 1"
          class="prev"
          role="navigation"
          unselectable="on"
          @click="navigate(currentPage - 1)"
        >
          {{ i18n.prev }}
        </div>
        <div v-if="displayLeftEllipsis" role="navigation" @click="navigate(1)">
          1
        </div>
        <div v-if="displayLeftEllipsis" class="ellipsis">...</div>
        <div
          v-for="num in indexs"
          :key="num"
          :class="{ active: currentPage === num }"
          role="navigation"
          @click="navigate(num)"
        >
          {{ num }}
        </div>
        <div v-if="displayRightEllipsis" class="ellipsis">...</div>
        <div
          v-if="displayRightEllipsis"
          role="navigation"
          @click="navigate(totalPages)"
        >
          {{ totalPages }}
        </div>
        <div
          v-if="currentPage < totalPages"
          class="next"
          role="navigation"
          @click="navigate(currentPage + 1)"
        >
          {{ i18n.next }}
        </div>
      </div>
      <div class="navigate-wrapper">
        <label for="navigation-text">{{ i18n.navigate }}:&nbsp;</label>
        <input
          id="navigation-text"
          v-model="input"
          type="text"
          @keypress.enter="jumpPage(input)"
        />
        <button
          class="navigate"
          role="navigation"
          :title="i18n.button"
          @click="jumpPage(input)"
        >
          {{ i18n.button }}
        </button>
      </div>
    </div>
  </div>
</template>

<script src="./Pagination" />

<style lang="stylus">
$bgColor ?= #fff

.pagination-wrapper
  margin 1.25rem 0 0.75rem
  font-family Arial, Helvetica, sans-serif
  font-weight 600
  font-size 15px
  line-height 2

  .pagination-list
    display flex
    justify-content space-evenly
    align-items center
    flex-wrap wrap
    user-select none

    .btn-group
      display flex
      align-items stretch
      height 30px
      margin 0 0.5rem
      border 1px solid var(--border-color, $borderColor)
      border-radius 0.25rem
      overflow hidden

      div
        position relative
        padding 0 0.5rem
        background var(--bgcolor, $bgColor)
        color var(--accent-color, $accentColor)
        cursor pointer

        &::before
          content ' '
          position absolute
          top 0
          left 0
          bottom 0
          width 1px
          background var(--border-color, $borderColor)

        &:first-child
          &::before
            background transparent

        &:hover, &.active
          background var(--accent-color, $accentColor)
          color var(--white, #fff)

          &::before
            background var(--accent-color, $accentColor)

        &.active + div, &:hover + div
          &::before
            background var(--accent-color, $accentColor)

        &.prev, &.next
          font-size 13px
          line-height 30px

        &.active, &.ellipsis
          cursor default

    .navigate-wrapper
      display flex
      justify-content center
      align-items center
      margin 0.5rem

      input
        width 3.5rem
        margin 6px 0
        border 1px solid var(--border-color, $borderColor)
        border-radius 0.25em
        color var(--text-color, $textColor)
        background var(--bgcolor, #fff)
        text-align center
        line-height 2
        outline none

      .navigate
        margin-left 5px
        padding 0 0.75em
        border 1px solid var(--border-color, $borderColor)
        border-radius 0.25em
        background var(--bgcolor, $bgColor)
        color var(--accent-color, $accentColor)
        font-weight 600
        font-size 15px
        line-height 2
        overflow hidden
        outline none
        cursor pointer

        &:hover
          color var(--white, #fff)
          background var(--accent-color, $accentColor)
          border-color var(--accent-color, $accentColor)
</style>
