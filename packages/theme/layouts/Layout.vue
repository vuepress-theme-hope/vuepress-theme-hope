<template>
  <Common :sidebar="$frontmatter.blog !== true">
    <template #sidebar-bottom>
      <BlogInfo v-if="$frontmatter.blog && $themeConfig.blog !== false" />
    </template>

    <template #default="slotProps">
      <BlogPage v-if="$frontmatter.blog && $themeConfig.blog !== false" />

      <Home v-else-if="$frontmatter.home" />

      <Page v-else :headers="slotProps.headers" :sidebar-items="slotProps.sidebarItems">
        <slot slot="top" name="page-top" />
        <slot slot="bottom" name="page-bottom" />
      </Page>
    </template>
  </Common>
</template>

<script src="./Layout" />
