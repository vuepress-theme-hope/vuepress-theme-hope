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
          v-for="(subItem, index) in item.items"
          :key="subItem.link || index"
          class="dropdown-item"
        >
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

          <ul v-if="subItem.type === 'links'" class="dropdown-subitem-wrapper">
            <li
              v-for="childSubItem in subItem.items"
              :key="childSubItem.link"
              class="dropdown-subitem"
            >
              <NavLink
                :item="childSubItem"
                @focusout="
                  isLastItemOfArray(childSubItem, subItem.items) &&
                    isLastItemOfArray(subItem, item.items) &&
                    setOpen(false)
                "
              />
            </li>
          </ul>

          <NavLink
            v-else
            :item="subItem"
            @focusout="isLastItemOfArray(subItem, item.items) && setOpen(false)"
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

  .dropdown-title
    display block
    cursor inherit
    padding inherit
    border none
    background transparent
    color var(--dark-grey)
    font-size 0.9rem
    font-family inherit
    font-weight 500
    line-height 1.4rem

    &::after
      border-left 5px solid var(--accent-color)

    &:hover
      border-color transparent

    .arrow
      vertical-align middle
      margin-top -1px
      margin-left 0.4rem

  .mobile-dropdown-title
    @extend .dropdown-title
    display none
    font-weight 600
    font-size inherit

    &:hover
      color var(--accent-color)

  .nav-dropdown
    .dropdown-item
      color inherit
      line-height 1.7rem

      h4
        margin 0
        padding 0.75rem 1rem 0.25rem 0.75rem
        border-top 1px solid var(--grey14)
        color var(--dark-grey)
        font-size 0.9rem

      .dropdown-subitem-wrapper
        padding 0
        list-style none

        .dropdown-subitem
          font-size 0.9em

      .nav-link
        display block
        position relative
        margin-bottom 0
        padding 0 1.5rem 0 1.25rem
        border-bottom none
        font-weight 400
        line-height 1.7rem

        &:hover
          color var(--accent-color)

        &.active
          color var(--accent-color)

          &::after
            content ''
            position absolute
            top calc(50% - 2px)
            left 9px
            width 0
            height 0
            border-top 3px solid transparent
            border-left 5px solid var(--accent-color)
            border-bottom 3px solid transparent

      &:first-child h4
        margin-top 0
        padding-top 0
        border-top 0

@media (max-width $MQMobile)
  .dropdown-wrapper
    &.open .dropdown-title
      margin-bottom 0.5rem

    .dropdown-title
      display none

    .mobile-dropdown-title
      display block
      color var(--text-color)
      font-weight 600
      font-size inherit

      &:hover
        color var(--accent-color)

    .nav-dropdown
      transition height 0.1s ease-out
      overflow hidden

      .dropdown-item
        h4
          border-top 0
          margin-top 0
          padding-top 0

        h4, & > .nav-link
          font-size 15px
          line-height 2rem

        .dropdown-subitem
          font-size 14px
          padding-left 1rem

@media (min-width $MQMobile)
  .dropdown-wrapper
    height 1.8rem

    &:hover .nav-dropdown, &.open .nav-dropdown
      // override the inline style.
      display block !important

    .nav-dropdown
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
      box-shadow 2px 2px 10px var(--card-shadow-color)
      background var(--bgcolor)
      text-align left
      white-space nowrap
      overflow-y auto

      .dropdown-item .nav-link
        color var(--dark-grey)
</style>
