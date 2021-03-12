<template>
  <div v-show="commentDisplay" class="valine-wrapper">
    <div id="valine" />
  </div>
</template>

<script src="./Valine" />

<style lang="stylus">
@require '~@mr-hope/vuepress-shared/styles/wrapper'

.page
  .valine-wrapper
    @extend $wrapper

    .v[data-class=v]
      *
        color var(--grey3, #333)

      &:empty
        padding 0

      hr
        color var(--grey14, #eee)

      a
        color var(--accent-color, $accentColor)

        &:hover
          color var(--accent-color, $accentColor)

      pre, code
        color var(--dark-grey, #666)
        background var(--code-bgcolor, #ecf4fa)

      blockquote
        color var(--dark-grey, #666)

      .vwrap
        border-width 0
        box-shadow 0 0 8px 4px var(--box-shadow-color, #f0f1f2)

        .vicon.actived
          fill var(--accent-color, $accentColor)

        .vemojis, .vpreview
          box-shadow 0px 0 1px var(--grey12, #bbb)

        .vheader .vinput
          border-color var(--grey12, #bbb)

          &:focus
            border-color var(--accent-color, $accentColor)

        .vcontrol .col
          color var(--grey12, #bbb)

        .vmark
          .valert
            .vtext
              color var(--bgcolor, #fff)

            .vcode
              background var(--grey12, #bbb)

              &:focus
                background var(--bgcolor, #fff)
                border-color var(--accent-color, $accentColor)

      .power
        color var(--light-grey, #999)

      .vbtn
        background var(--bgcolor, #fff)

        &:active, &:hover
          color var(--white, #fff)
          background var(--accent-color, $accentColor)
          border-color var(--accent-color, $accentColor)

      .vempty
        color var(--light-grey, #999)

      .vcount
        font-size 1.2em

      .vcards
        .vcard
          .vimg
            border-color var(--grey12, #bbb)

          .vhead
            .vnick
              color var(--accent-color, $accentColor)

              &:after
                content ''
                position absolute
                left 0
                right 0
                bottom 0
                height 1.5px
                background var(--accent-color)
                transform scaleX(0)
                transition 0.2s ease-in-out

              &:hover:after
                transform scaleX(1)

            .vsys
              background var(--grey14, #eee)
              color var(--light-grey, #999)

          .vh
            border-color var(--grey12, #bbb)

            .vtime
              color var(--light-grey, #999)

          .vmeta .vat
            padding 4px 6px
            color var(--accent-color, $accentColor)
            transition background-color 0.4s, color 0.4s
            border-radius 4px

            &:hover
              background-color var(--accent-color, $accentColor)
              color var(--white, #fff)

          .vcontent
            color var(--grey4, #444)

            &.expand:after
              color var(--grey, #888)

          .vreply-wrapper .vwrap
            margin 0 8px

          .vquote
            color var(--dark-grey, #666)

      .vpower
        display none
</style>
