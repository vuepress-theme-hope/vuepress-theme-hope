<template>
  <div id="install-modal-wrapper">
    <div class="background" @click="$emit('toogle', false)" />

    <div class="install-modal">
      <div class="header">
        <div class="logo">
          <img
            v-if="manifest.icons"
            :src="manifest.icons[0].src"
            alt="App Logo"
          />
          <div class="title">
            <h1>{{ manifest.short_name || manifest.name }}</h1>
            <p class="desc">{{ i18n.explain }}</p>
          </div>
        </div>
        <button
          class="close-button"
          aria-label="Close"
          @click="$emit('toogle', false)"
        >
          <CloseIcon />
        </button>
      </div>
      <div class="content">
        <div class="highlight">
          <div v-if="manifest.features" class="feature-wrapper">
            <h3>{{ i18n.feature }}</h3>
            <ul v-if="manifest.features">
              <li
                v-for="feature in manifest.features"
                :key="feature"
                v-text="feature"
              />
            </ul>
          </div>

          <div v-if="manifest.screenshots" class="screenshot-wrapper">
            <button aria-label="previous image" @click="scrollToLeft">
              <ArrowLeftIcon />
            </button>
            <section class="screenshot">
              <div
                v-for="screenshot in manifest.screenshots"
                :key="screenshot.src"
              >
                <img alt="App Screenshot" :src="screenshot.src" />
              </div>
            </section>
            <button aria-label="next image" @click="scrollToRight">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div class="description">
          <h3 v-text="i18n.desc" />
          <p v-text="manifest.description" />
        </div>
      </div>

      <div class="button-wrapper">
        <p v-if="isIOS" class="iosText">{{ i18n.iOSInstall }}</p>
        <template v-else>
          <button class="install-button" @click="install">
            {{ i18n.install }} <span>{{ manifest.short_name }}</span>
          </button>
          <button class="cancel-button" @click="$emit('toogle', false)">
            {{ i18n.cancel }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script src="./PWAInstallModal" />

<style lang="stylus">
@keyframes opened
  from
    transform scale(0.8, 0.8)
    opacity 0.4

  to
    transform scale(1, 1)
    opacity 1

@keyframes mobile
  from
    opacity 0.6

  to
    opacity 1

@keyframes fadein
  from
    opacity 0.2

  to
    opacity 1

#install-modal-wrapper
  display flex
  justify-content center
  align-items center
  width 100vw
  height 100vh
  position fixed
  overflow auto
  top 0
  left 0
  z-index 997

  button
    outline none
    cursor pointer

  .background
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background #eeeb
    backdrop-filter blur(5px)
    z-index 998
    animation-name fadein
    animation-duration 250ms

    .theme-dark &
      background #111b

    @media (max-width 400px)
      display none

  .install-modal
    display flex
    flex-direction column
    position absolute
    z-index 999
    max-width 56em
    border-radius 10px
    background var(--background-color, #fff)
    font-family sans-serif
    animation-name opened
    animation-duration 150ms

    @media (max-width 1220px)
      width 92%
      animation-name mobile
      animation-duration 250ms

    @media (max-width 400px)
      width 100%
      height 100%
      overflow scroll

  .header
    display flex
    justify-content space-between
    margin 40px
    margin-bottom 32px

    @media (max-width 962px)
      margin-bottom 24px

    @media (max-width 800px)
      margin 20px

    .logo
      display flex

    h1
      font-size 34px
      color var(--dark-gery, #666)
      margin-top 0
      margin-bottom 7px

      @media (max-width 962px)
        margin-bottom 0

      @media (max-width 400px)
        font-size 26px

    img
      width 122px
      height 122px
      padding 12px
      margin-right 24px
      border-radius 24px
      background-color #eee

      .theme-dark &
        background-color #444

      @media (max-width 962px)
        height 60px
        width 60px

      @media (max-width 800px)
        padding 8px
        margin-right 12px

      @media (max-width 400px)
        height 40px
        width 40px
        padding 6px

    .close-button
      align-self self-end
      padding 4px 12px
      border none
      border-radius 20px
      background transparent
      color var(--grey3, #333)

      &:hover, &:focus
        color var(--dark-grey, #666)

      @media (max-width 962px)
        align-items center

    .desc
      max-width 40em
      color var(--grey, #888)
      font-size 14px
      text-overflow ellipsis
      white-space pre-wrap
      overflow hidden

      @media (max-width 962px)
        display none

  .content
    margin-left 40px
    margin-right 40px
    flex 1
    color var(--grey3, #333)

    @media (max-width 800px)
      margin-left 20px
      margin-right 20px
      margin-bottom 5em

    h3
      font-size 22px
      margin-bottom 12px

    p
      font-size 14px

  .highlight
    display flex
    justify-content space-around
    align-items center
    margin-right 20px

    @media (max-width 800px)
      flex-direction column
      align-items flex-start
      margin-right 0px

    h3
      font-size 22px
      font-weight 600
      line-height 225%
      margin-top 0px

      @media (max-width 400px)
        font-size 18px
        margin-bottom 0px

  .feature-wrapper
    overflow hidden
    padding-right 2em

    ul
      padding-inline-start 22px
      margin-block-start 12px

      @media (max-width 400px)
        margin-top 0px

    li
      font-style normal
      font-weight 600
      font-size 16px
      line-height 29px
      color var(--dark-grey, #666)

  .screenshot-wrapper
    max-height 220px
    display flex
    max-width 30em

    @media (max-width 800px)
      width 100%

    button
      border none
      width 4em
      transition background-color 0.2s

      &:hover, &:focus
        background-color #bbb

      svg
        width 28px
        fill #6b6969

  .screenshot
    width 22em
    max-height 220px
    display flex
    scroll-snap-type x mandatory
    flex-wrap wrap
    flex-direction column
    overflow-x scroll
    -webkit-overflow-scrolling touch

    @media (max-width 1220px)
      justify-content center

    &::-webkit-scrollbar
      display none

    div
      display flex
      align-items center
      justify-content center
      scroll-snap-align start
      height 14em
      width 100%
      background #efefef

    img
      height 100%
      object-fit contain

      @media (max-width 800px)
        height 180px

  .description
    margin-bottom 3em

  .button-wrapper
    display flex
    justify-content flex-end
    align-items center
    position relative
    height 100px
    background #dedede75
    width 100%
    right 0em
    border-radius 0px 0px 12px 12px

    @media (max-width 800px)
      justify-content center
      margin-bottom 0
      padding-top 1em
      padding-bottom 1em
      background #efefef2b
      backdrop-filter blur(10px)

    @media (max-height 780px)
      height 70px
      background transparent

  .install-button, .cancel-button
    display block
    flex 0 0 auto
    min-width 130px
    padding 10px 20px
    margin 0 15px
    border solid 2px var(--accent-color, $accentColor)
    border-radius 20px
    text-align center
    font-weight 600
    font-size 14px
    line-height 1

  .install-button
    background-color var(--accent-color, $accentColor)
    color var(--white, #fff)

    &:hover, &:focus
      background-color var(--accent-color-l10, $accentColor)

    @media (max-width 400px)
      span
        display none

  .cancel-button
    background-color transparent
    color var(--accent-color, $accentColor)

    &:hover, &:focus
      background-color var(--accent-color-l10, $accentColor)
      color var(--white, #fff)

  .iOSText
    color var(--accent-color, $accentColor)
    text-align center
    font-weight bold
    position fixed
    bottom 0
    left 0
    right 0
    backdrop-filter blur(10px)
    background rgba(239, 239, 239, 0.17)
    margin 0
    padding 2em

@media all and (display-mode standalone)
  button
    display none
</style>
