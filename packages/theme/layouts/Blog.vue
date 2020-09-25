<template>
  <Common :sidebar="false">
    <template #sidebar-bottom>
      <BlogInfo />
    </template>

    <Password
      v-if="currentPathEncrypted && !globalEncrypted"
      @password-verify="setPassword"
    />
    <BlogPage v-else />
  </Common>
</template>

<script src="./Blog" />
