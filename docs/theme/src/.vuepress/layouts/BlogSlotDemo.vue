<script setup lang="ts">
import { useLocale } from "@vuepress/helper/client";
import { Blog } from "vuepress-theme-hope/blog";

const locale = useLocale({
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/": {
    slot: "Slot",
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "/zh/": {
    slot: "插槽",
  },
});
</script>

<template>
  <Blog>
    <template #contentBefore>
      <div class="slot-demo-block">contentBefore {{ locale.slot }}</div>
    </template>

    <template #contentAfter>
      <div class="slot-demo-block">contentAfter {{ locale.slot }}</div>
    </template>

    <template #articlesBefore>
      <div class="slot-demo-block">articlesBefore {{ locale.slot }}</div>
    </template>

    <template #articlesAfter>
      <div class="slot-demo-block">articlesAfter {{ locale.slot }}</div>
    </template>

    <template #infoBefore>
      <div class="slot-demo-block">infoBefore {{ locale.slot }}</div>
    </template>

    <template #infoAfter>
      <div class="slot-demo-block">infoAfter {{ locale.slot }}</div>
    </template>

    <template #tocAfter>
      <div class="slot-demo-block">tocAfter {{ locale.slot }}</div>
    </template>

    <template #sidebarTop>
      <div class="slot-demo-block">sidebarTop {{ locale.slot }}</div>
    </template>

    <template #sidebarBottom>
      <div class="slot-demo-block">sidebarBottom {{ locale.slot }}</div>
    </template>

    <template #navScreenTop>
      <div class="slot-demo-block">navScreenTop {{ locale.slot }}</div>
    </template>

    <template #navScreenBottom>
      <div class="slot-demo-block">navScreenBottom {{ locale.slot }}</div>
    </template>

    <template #sidebarItems>
      <div class="slot-demo-block">
        <p>sidebarItems {{ locale.slot }}</p>

        <p>This replace the default sidebar items</p>
      </div>
    </template>

    <template #heroInfo="heroInfo">
      <div class="slot-demo-block vp-blog-hero-image">
        heroInfo {{ locale.slot }}
        <p class="slot-data">
          {{ JSON.stringify(heroInfo, null, 2) }}
        </p>
      </div>
    </template>

    <template #heroLogo="heroLogo">
      <div class="slot-demo-block vp-blog-hero-infos">
        heroLogo {{ locale.slot }}
        <p class="slot-data">
          {{ JSON.stringify(heroLogo, null, 2) }}
        </p>
      </div>
    </template>

    <template #heroBg="heroBg">
      <div class="slot-demo-block vp-blog-mask">
        heroBg {{ locale.slot }}
        <p class="slot-data">
          {{ JSON.stringify(heroBg, null, 2) }}
        </p>
      </div>
    </template>

    <template #heroBefore>
      <div class="slot-demo-block">heroBefore {{ locale.slot }}</div>
    </template>

    <template #heroAfter>
      <div class="slot-demo-block">heroAfter {{ locale.slot }}</div>
    </template>
  </Blog>
</template>

<style lang="scss">
.theme-container.blog-slot-demo .vp-page.vp-blog-home {
  padding-top: var(--navbar-height);
}
</style>

<style lang="scss" scoped>
.slot-demo-inline {
  display: inline-block;
  background-color: var(--vp-c-bg-alt);
  border-radius: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  width: 2rem;
  height: 2rem;
  margin: 0.25em;
}

.slot-demo-block {
  background-color: var(--vp-c-bg-alt);
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  margin: 0.5rem 1rem;

  text-align: center;
  font-size: 18px;
  line-height: 1.5;
  color: var(--vp-c-text-mute);
}

.slot-data {
  white-space: pre-wrap;
  text-align: left;
  font-size: 14px;
  line-height: 1.25;
}
</style>
