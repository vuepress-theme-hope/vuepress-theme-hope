<script setup lang="ts">
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import NormalPage from "@theme-hope/components/NormalPage";
import SkipLink from "@theme-hope/components/SkipLink";
import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
</script>

<template>
  <SkipLink />
  <CommonWrapper>
    <FadeSlideY>
      <NormalPage>
        <template #contentBefore>
          <div class="slot-demo-block">contentBefore Slot</div>
        </template>
        <template #contentAfter>
          <div class="slot-demo-block">contentAfter Slot</div>
        </template>
        <template #top>
          <div class="slot-demo-block">page top Slot</div>
        </template>
        <template #bottom>
          <div class="slot-demo-block">page bottom Slot</div>
        </template>
        <template #tocBefore>
          <div class="slot-demo-block">tocBefore Slot</div>
        </template>
        <template #tocAfter>
          <div class="slot-demo-block">tocAfter Slot</div>
        </template>
      </NormalPage>
    </FadeSlideY>

    <template #navbarStartBefore>
      <div
        class="slot-demo-inline"
        aria-label="navbarStartBefore Slot"
        data-balloon-pos="down"
      >
        ...
      </div>
    </template>
    <template #navbarStartAfter>
      <div
        class="slot-demo-inline"
        aria-label="navbarStartAfter Slot"
        data-balloon-pos="down"
      >
        ...
      </div>
    </template>
    <template #navbarCenterBefore>
      <div
        class="slot-demo-inline"
        aria-label="navbarCenterBefore Slot"
        data-balloon-pos="down"
      >
        ...
      </div>
    </template>
    <template #navbarCenterAfter>
      <div
        class="slot-demo-inline"
        aria-label="navbarCenterAfter Slot"
        data-balloon-pos="down"
      >
        ...
      </div>
    </template>
    <template #navbarEndBefore>
      <div
        class="slot-demo-inline"
        aria-label="navbarEndBefore Slot"
        data-balloon-pos="down"
      >
        ...
      </div>
    </template>
    <template #navbarEndAfter>
      <div
        class="slot-demo-inline"
        aria-label="navbarEndAfter Slot"
        data-balloon-pos="down"
      >
        ...
      </div>
    </template>
    <template #sidebarTop>
      <div class="slot-demo-block">sidebarTop Slot</div>
    </template>
    <template #sidebarBottom>
      <div class="slot-demo-block">sidebarBottom Slot</div>
    </template>
    <template #navScreenTop>
      <div class="slot-demo-block">navScreenTop Slot</div>
    </template>
    <template #navScreenBottom>
      <div class="slot-demo-block">navScreenBottom Slot</div>
    </template>
  </CommonWrapper>
</template>

<style lang="scss" scoped>
.slot-demo-inline {
  display: inline-block;
  background-color: var(--bg-color-tertiary);
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
  background-color: var(--bg-color-tertiary);
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  margin: 0.5rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: var(--text-color-light);
}
</style>
