<template>
  <div
    :class="pageClasses"
    class="theme-container"
    @touchend="onTouchEnd"
    @touchstart="onTouchStart"
  >
    <!-- 密码弹窗 -->
    <Password v-if="globalEncrypted" @password-verify="globalPasswordCheck" />
    <!-- 内容 -->
    <template v-else>
      <Navbar v-if="showNavbar" @toggle-sidebar="toggleSidebar" />

      <div class="sidebar-mask" @click="toggleSidebar(false)" />

      <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #center>
          <slot name="sidebar-center" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </Sidebar>

      <slot :sidebar-items="sidebarItems" :headers="headers" />
    </template>
  </div>
</template>

<script src="./Common" />

<style lang="stylus">
.theme-container
  min-height 100vh

.sidebar-mask
  position fixed
  z-index 9
  top 0
  left 0
  width 100vw
  height 100vh
  display none

  .theme-container.sidebar-open &
    display block
</style>
