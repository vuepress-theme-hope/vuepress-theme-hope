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
  margin-top 0.85rem
  /* 2 * margin + border-radius of <pre> tag */
  margin-bottom calc(-1.7rem - 6px)
  padding-bottom calc(1.7rem - 6px)
  padding-left 10px
  padding-top 10px
  border-top-left-radius 6px
  border-top-right-radius 6px
  background-color var(--code-bgcolor, #282c34)

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
  border 0
  padding 5px
  cursor pointer
  background-color transparent
  font-size 0.85em
  line-height 1.4
  color var(--text-color, $textColor)
  font-weight 600

  &:focus
    outline none

  &.active
    border-bottom var(--accent-color, $accentColor) 1px solid
</style>
