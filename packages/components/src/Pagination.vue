<template>
  <div v-if="enable" class="pagination-wrapper">
    <div class="pagination-list">
      <div class="btn-group">
        <div
          v-if="currentPage > 1"
          class="btn"
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
        <div
          v-if="displayRightEllipsis && currentPage < totalPages - 3"
          class="ellipsis"
        >
          ...
        </div>
        <div
          v-if="displayRightEllipsis && currentPage < totalPages - 3"
          role="navigation"
          @click="navigate(totalPages)"
        >
          {{ totalPages }}
        </div>
        <div
          v-if="currentPage < totalPages"
          class="btn"
          role="navigation"
          @click="navigate(currentPage + 1)"
        >
          {{ i18n.next }}
        </div>
      </div>
      <div class="navigate-wrapper">
        <div class="text">{{ i18n.navigate }}:&nbsp;</div>
        <input v-model="input" type="text" @keypress.enter="jumpPage(input)" />
        <div class="navigate-button" role="navigation" @click="jumpPage(input)">
          {{ i18n.button }}
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./Pagination" />

<style lang="stylus">
.pagination-wrapper
  font-weight 600
  margin 1.25rem -0.5rem 0.75rem

  .pagination-list
    display flex
    justify-content space-evenly
    align-items center
    -webkit-touch-callout none
    user-select none
    flex-wrap wrap

    .btn-group
      display flex
      align-items stretch
      margin 0 0.5em
      border 1px solid var(--border-color, $borderColor)
      border-radius 0.25em
      overflow hidden

      div
        position relative
        padding 5px 0.5em
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
      margin 0 0.5em

      div.text
        font-size 14px

      input
        width 3.5em
        height 1.5em
        font-size 13px
        border 1px solid var(--border-color, $borderColor)
        border-radius 0.25em
        outline none
        text-align center
        margin 6px 0
        color var(--black, #000)
        background-color var(--background-color, #fff)

      .navigate-button
        font-size 14px
        margin-left 5px
        padding 0.25em 0.5em
        border 1px solid var(--border-color, $borderColor)
        border-radius 0.25em
        overflow hidden
        cursor pointer

        &:hover
          color var(--white, #fff)
          background var(--accent-color, $accentColor)
          border-color var(--accent-color, $accentColor)
</style>
