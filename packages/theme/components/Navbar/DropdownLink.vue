<template>
  <div class="dropdown-wrapper" :class="{ open }">
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">
        <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
        {{ item.text }}
      </span>
      <span class="arrow down" />
    </button>
    <button
      class="mobile-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="setOpen(!open)"
    >
      <span class="title">
        <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
        {{ item.text }}
      </span>
      <span class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <DropdownTransition>
      <ul v-show="open" class="nav-dropdown">
        <li
          v-for="(child, index) in item.items"
          :key="child.link || index"
          class="dropdown-item"
        >
          <h4 v-if="child.type === 'links'" class="dropdown-subtitle">
            <NavLink
              v-if="child.link"
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) &&
                  child.children.length === 0 &&
                  setOpen(false)
              "
            />

            <span v-else>{{ child.text }}</span>
          </h4>

          <ul v-if="child.type === 'links'" class="dropdown-subitem-wrapper">
            <li
              v-for="grandchild in child.items"
              :key="grandchild.link"
              class="dropdown-subitem"
            >
              <NavLink
                :item="grandchild"
                @focusout="
                  isLastItemOfArray(grandchild, child.items) &&
                    isLastItemOfArray(child, item.items) &&
                    setOpen(false)
                "
              />
            </li>
          </ul>

          <NavLink
            v-else
            :item="child"
            @focusout="isLastItemOfArray(child, item.items) && setOpen(false)"
          />
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script src="./DropdownLink" />

<style lang="stylus">
.dropdown-wrapper
  cursor pointer

  .navbar &
    height 1.8rem

    &:hover, &.open
      .nav-dropdown
        display block !important

  .sidebar &
    &.open .dropdown-title
      margin-bottom 0.5rem

  .dropdown-title, .mobile-dropdown-title
    cursor inherit
    padding inherit
    font-family inherit
    line-height 1.4rem

  .dropdown-title
    color var(--dark-grey)
    font-size 0.9rem
    font-weight 500

    .sidebar &
      display none

    &::after
      border-left 5px solid var(--accent-color)

    &:hover
      border-color transparent

    .arrow
      font-size 1.2em

  .mobile-dropdown-title
    color var(--text-color)
    font-weight bold
    font-size inherit

    .navbar &
      display none

    &:hover
      color var(--accent-color)

  .nav-dropdown
    .navbar &
      display none
      box-sizing border-box
      position absolute
      top 100%
      right 0
      max-height calc(100vh - 2.7rem)
      // Avoid height shaked by clicking
      height auto !important
      margin 0
      padding 0.6rem 0
      border 1px solid var(--grey14)
      border-radius 0.25rem
      background var(--bgcolor)
      box-shadow 2px 2px 10px var(--card-shadow-color)
      text-align left
      white-space nowrap
      overflow-y auto

    .sidebar &
      margin-top 0.25rem
      transition height 0.1s ease-out
      overflow hidden

  .dropdown-item
    color inherit
    line-height 1.7rem

    h4
      margin 0

      .nav-link
        padding 0

        &:before
          display none

      .navbar &
        padding 0.75rem 1rem 0.25rem 0.75rem
        border-top 1px solid var(--grey14)
        color var(--dark-grey)
        font-size 0.9rem

      .sidebar &
        padding-left 1.25rem
        font-size 15px
        line-height 1.7

    &:first-child h4
      .navbar &
        padding-top 0
        border-top 0

    .nav-link
      display block
      position relative
      margin-bottom 0
      padding 0 1.5rem 0 1.25rem
      border-bottom none
      font-weight 400
      line-height 1.7rem

      .navbar &
        color var(--dark-grey)

      &:hover
        color var(--accent-color)

      &.active
        color var(--accent-color)

        &::before
          content ''
          position absolute
          top calc(50% - 3px)
          left 9px
          width 0
          height 0
          border-top 3px solid transparent
          border-left 5px solid var(--accent-color)
          border-bottom 3px solid transparent

    & > .nav-link
      .sidebar &
        font-size 15px
        line-height 2rem

    .dropdown-subitem-wrapper
      padding 0
      list-style none

    .dropdown-subitem
      font-size 0.9em

      .sidebar &
        padding-left 0.5rem
</style>
