<template>
  <main class="page">
    <MyTransition>
      <BreadCrumb :key="$route.path" />
    </MyTransition>

    <slot name="top" />

    <MyTransition :delay="0.04">
      <PageInfo :key="$route.path" />
    </MyTransition>

    <MyTransition v-if="pagePassword && !pageDescrypted" :delay="0.08">
      <Password
        :key="$route.path"
        :page="true"
        @password-verify="password = $event"
      />
    </MyTransition>

    <template v-else>
      <MyTransition :delay="0.12">
        <Anchor :key="$route.path" />
      </MyTransition>

      <MyTransition v-show="!pagePassword || pageDescrypted" :delay="0.08">
        <Content :key="$route.path" class="theme-default-content" />
      </MyTransition>

      <MyTransition :delay="0.12">
        <PageMeta :key="$route.path" />
      </MyTransition>

      <MyTransition :delay="0.14">
        <PageNav :key="$route.path" v-bind="{ sidebarItems }" />
      </MyTransition>

      <MyTransition :delay="0.16">
        <Comment :key="$route.path" />
      </MyTransition>
    </template>

    <slot name="bottom" />
  </main>
</template>

<script src="./Page" />

<style lang="stylus">
.page
  display block
  box-sizing border-box
  min-height 100vh
  padding-left $sidebarWidth
  padding-bottom 2rem
  background var(--bgcolor)

  @media (max-width $MQMobile)
    min-height 100vh

  // narrow desktop / iPad
  @media (max-width $MQNarrow)
    padding-left $mobileSidebarWidth

  @media (min-width ($MQMobile + 1px))
    .theme-container:not(.has-sidebar) &
      padding-left 0

  // wide mobile
  @media (max-width $MQMobile)
    padding-left 0

  @media (min-width $MQWide)
    .has-anchor &:not(.blog)
      padding-right 16rem
</style>
