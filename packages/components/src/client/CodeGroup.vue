<template>
  <ClientOnly>
    <div class="code-group">
      <div class="code-group-nav">
        <ul class="code-group-ul">
          <li
            v-for="(codeTab, index) in codeTabs"
            :key="codeTab.title"
            class="code-group-li"
          >
            <button
              class="code-group-nav-tab"
              :class="{
                active: index === activeTabIndex,
              }"
              @click="changeCodeTab(index)"
              v-text="codeTab.title"
            />
          </li>
        </ul>
      </div>
      <slot />
      <pre
        v-if="!codeTabs.length"
        class="hints"
        v-text="'// Make sure to add code blocks to your code group'"
      />
    </div>
  </ClientOnly>
</template>

<script src="./CodeGroup" />

<style lang="stylus">
.code-group-nav
  /* 2 * margin + border-radius of <pre> tag */
  margin 0.85rem 0 calc(-1.7rem - 7px)
  padding 0 5px calc(1.7rem - 7px)
  border-top-left-radius 6px
  border-top-right-radius 6px
  background-color darken(saturate(#282c34, 10%), 35%)

  @media (max-width $MQMobileNarrow)
    margin-left -1.5rem
    margin-right -1.5rem
    border-radius 0

.code-group-ul
  display inline-flex
  margin auto 0
  padding-left 0
  list-style none

.code-group-nav-tab
  position relative
  border 0
  padding 6px 10px
  cursor pointer
  border-top-left-radius 8px
  border-top-right-radius 8px
  background-color transparent
  font-size 0.85em
  line-height 1.4
  color var(--text-color, $textColor)
  font-weight 600

  &:hover
    background-color darken(saturate(#282c34, 10%), 5%)

  &::before, &::after
    position absolute
    z-index 1
    content ' '
    bottom 0
    width 8px
    height 8px

  &::before
    right 100%

  &::after
    left 100%

  &:focus
    outline none

  &.active
    border-bottom var(--accent-color, $accentColor) 1px solid

    &:before
      background radial-gradient(16px at left top, transparent 50%, #282c34 50%)

    &:after
      background radial-gradient(16px at right top, transparent 50%, #282c34 50%)
</style>
