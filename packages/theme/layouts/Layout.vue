<template>
  <Common :sidebar="$frontmatter.blog !== true">
    <template
      v-if="$frontmatter.blog && $themeConfig.blog !== false"
      #sidebar-bottom
    >
      <BlogInfo />
    </template>

    <template #default="slotProps">
      <BlogHome v-if="$frontmatter.blog && $themeConfig.blog !== false" />

      <Home v-else-if="$frontmatter.home" />

      <Page
        v-else
        :headers="slotProps.headers"
        :sidebar-items="slotProps.sidebarItems"
      >
        <template #top>
          <slot name="page-top" />
        </template>

        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </template>
  </Common>
</template>

<script src="./Layout" />
