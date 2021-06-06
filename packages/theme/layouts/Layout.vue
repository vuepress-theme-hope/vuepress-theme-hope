<template>
  <Common :sidebar="$frontmatter.blog !== true">
    <template #default="slotProps">
      <BlogHome v-if="$frontmatter.blog && $themeConfig.blog !== false" />

      <Home v-else-if="$frontmatter.home" />

      <Page
        v-else
        :headers="slotProps.headers"
        :sidebar-items="slotProps.sidebarItems"
      />
    </template>
  </Common>
</template>

<script src="./Layout" />
