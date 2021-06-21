<template>
  <div class="mobile-dropdown-wrapper" :class="{ open }">
    <button
      class="dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown(!open)"
    >
      <slot name="title">
        <span class="title">
          <i v-if="item.icon" :class="`iconfont ${iconPrefix}${item.icon}`" />
          {{ item.text }}
        </span>
      </slot>
      <span class="arrow" :class="open ? 'down' : 'right'" />
    </button>

    <ExpandTransition>
      <ul v-show="open" class="nav-dropdown">
        <li
          v-for="(child, index) in item.children"
          :key="child.link || index"
          class="dropdown-item"
        >
          <template v-if="child.children">
            <h4 class="dropdown-subtitle">
              <NavLink
                v-if="child.link"
                :item="child"
                @focusout="
                  isLastItemOfArray(child, item.children) &&
                    child.children.length === 0 &&
                    handleDropdown(false)
                "
              />

              <span v-else>{{ child.text }}</span>
            </h4>

            <ul class="dropdown-subitem-wrapper">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="dropdown-subitem"
              >
                <NavLink
                  :item="grandchild"
                  @focusout="
                    isLastItemOfArray(grandchild, child.children) &&
                      isLastItemOfArray(child, item.children) &&
                      handleDropdown(false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <NavLink
              :item="child"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </ExpandTransition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, toRefs, watch } from "vue";
import { useRoute } from "vue-router";
import { useIconPrefix } from "@mr-hope/vuepress-shared/client";
import ExpandTransition from "../transitions/ExpandTransition";
import NavLink from "../NavLink";

import type { PropType } from "vue";
import type { NavGroup, NavItem } from "../../../shared";

export default defineComponent({
  name: "SidebarDropdownLink",

  components: {
    ExpandTransition,
    NavLink,
  },

  props: {
    item: {
      type: Object as PropType<NavGroup<NavItem>>,
      required: true,
    },
  },

  setup(props) {
    const { item } = toRefs(props);
    const iconPrefix = useIconPrefix();
    const dropdownAriaLabel = computed(
      () => item.value.ariaLabel || item.value.text
    );

    const open = ref(false);
    const route = useRoute();
    watch(
      () => route.path,
      () => {
        open.value = false;
      }
    );

    /**
     * Open the dropdown when user tab and click from keyboard.
     *
     * Use event.detail to detect tab and click from keyboard.
     * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
     */
    const handleDropdown = (event: boolean): void => {
      open.value = event;
    };

    const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
      arr[arr.length - 1] === item;

    return {
      open,
      dropdownAriaLabel,
      iconPrefix,

      handleDropdown,
      isLastItemOfArray,
    };
  },
});
</script>
