<template>
  <div class="search-box" role="search">
    <input
      ref="input"
      aria-label="Search"
      v-model="query"
      :class="{ focused: focused }"
      :placeholder="placeholder"
      autocomplete="off"
      spellcheck="false"
      @focus="focused = true"
      @blur="focused = false"
      @keyup.enter="go(focusIndex)"
      @keyup.up="onUp"
      @keyup.down="onDown"
    />
    <ul v-if="activeSuggestion" class="suggestions" :class="{ 'align-right': alignRight }" @mouseleave="unfocus">
      <li
        v-for="(s, i) in suggestions"
        :key="i"
        class="suggestion"
        :class="{ focused: i === focusIndex }"
        @mousedown="go(i)"
        @mouseenter="focus(i)"
      >
        <a :href="s.path" @click.prevent>
          <div
            v-if="
              s.parentPageTitle && (!suggestions[i - 1] || suggestions[i - 1].parentPageTitle !== s.parentPageTitle)
            "
            class="parent-page-title"
          >
            {{ s.parentPageTitle }}
          </div>
          <div class="suggestion-row">
            <div class="page-title">{{ s.title || s.path }}</div>
            <div class="suggestion-content">
              <template v-for="(w, wi) in s.display" :key="wi">
                <span :class="w.type">{{ w.str }}</span>
              </template>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, computed, reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { getPlaceholder, useSuggestions } from '../core/matchQuery'
  import { useThemeData } from '@vuepress/plugin-theme-data/lib/client'
  import { useRouteLocale } from '@vuepress/client'
  import { LocaleOptions } from '../core/types'

  export default defineComponent({
    name: 'SearchBox',
    setup() {
      const locale = useRouteLocale()

      const options = __NEXT_SEARCH_OPTIONS__
      let ol: LocaleOptions = reactive({})
      if (options.locales) {
        ol = options
      } else {
        ol = {
          locales: {
            '?': {
              fullText: options.fullText,
              placeholder: options.placeholder,
              frontmatter: {
                category: options.frontmatter.category,
                tag: options.frontmatter.tag,
              },
            },
          },
        }
      }

      const query = ref('')
      const focused = ref(false)
      const focusIndex = ref(0)
      const placeholder = getPlaceholder(ol, locale)
      const suggestions = useSuggestions(query, ol, locale)

      const themeData = useThemeData()
      const router = useRouter()

      const activeSuggestion = computed(() => query.value && focused.value && suggestions.value.length)
      const alignRight = computed(() => {
        const navCount = (themeData.value.navbar || []).length
        const repo = themeData.value.repo ? 1 : 0
        return navCount + repo <= 2
      })
      // eslint-disable-next-line require-jsdoc
      function onUp() {
        if (activeSuggestion.value) {
          focusIndex.value > 0 ? focusIndex.value-- : suggestions.value.length - 1
        }
      }

      // eslint-disable-next-line require-jsdoc
      function onDown() {
        if (activeSuggestion.value) {
          focusIndex.value < suggestions.value.length - 1 ? focusIndex.value++ : 0
        }
      }

      // eslint-disable-next-line require-jsdoc
      function focus(i: number) {
        focusIndex.value = i
      }

      // eslint-disable-next-line require-jsdoc
      function unfocus() {
        focusIndex.value = -1
      }

      // eslint-disable-next-line require-jsdoc
      function go(i: number) {
        if (!activeSuggestion.value) return
        const suggest = suggestions.value[i]
        if (suggest) {
          router.push(suggest.path)
        }
      }

      return {
        query,
        focused,
        focusIndex,
        suggestions,
        activeSuggestion,
        alignRight,
        placeholder,
        onUp,
        onDown,
        focus,
        unfocus,
        go,
      }
    },
  })
</script>

<style lang="scss">
  @import '../styles/vars';
  @import '../docs/.vuepress/styles/index';

  $next-search-input-border-color: var(--next-search-input-border-color);
  $next-search-border-color: var(--next-search-border-color);
  $next-search-input-accent-border-color: var(--next-search-input-accent-border-color);
  $next-search-input-text-color: var(--next-search-input-text-color);
  $next-search-bg-color: var(--next-search-bg-color);
  $next-search-ppt-text-color: var(--next-search-ppt-text-color);
  $next-search-ppt-bg-color: var(--next-search-ppt-bg-color);
  $next-search-pt-text-color: var(--next-search-pt-text-color);
  $next-search-pt-bg-color: var(--next-search-pt-bg-color);
  $next-search-item-text-color: var(--next-search-item-text-color);
  $next-search-hl-text-color: var(--next-search-hl-text-color);
  $next-search-hl-bg-color: var(--next-search-hl-bg-color);
  $next-search-item-accent-bg-color: var(--next-search-item-accent-bg-color);
  $next-search-item-accent-text-color: var(--next-search-item-accent-text-color);
  $next-search-hl-accent-text-color: var(--next-search-hl-accent-text-color);
  $next-search-hl-accent-bg-color: var(--next-search-hl-accent-bg-color);

  $MQNarrow: 959px !default;
  $MQMobile: 719px !default;
  $MQMobileNarrow: 419px !default;

  .search-box {
    display: inline-block;
    position: relative;
    margin-right: 1rem;
    input {
      cursor: text;
      width: 10rem;
      height: 2rem;
      color: $next-search-input-text-color;
      display: inline-block;
      //border: 1px solid $next-search-input-border-color;
      border: 1px solid $next-search-input-border-color;
      border-radius: 2rem;
      font-size: 0.9rem;
      line-height: 2rem;
      padding: 0 0.5rem 0 2rem;
      outline: none;
      transition: all 0.2s ease;
      background: $next-search-bg-color url('../assets/search.svg') 0.6rem 0.5rem no-repeat;
      background-size: 1rem;
      &:focus {
        cursor: auto;
        border-color: $next-search-input-accent-border-color;
      }
    }
    .suggestions {
      right: 0;
      list-style-type: none;
      display: block;
      overflow: auto;
      background: $next-search-bg-color;
      width: 30rem;
      max-height: 35rem;
      position: absolute;
      top: 1.5rem;
      border: 1px solid $next-search-border-color;
      padding: 0.4rem;
      border-radius: 0.3rem;
      &.align-right {
        right: 0;
      }
    }
    .suggestion {
      line-height: 1.4;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      a {
        display: block;
        white-space: normal;
        width: 100%;
        .parent-page-title {
          padding: 4px;
          color: $next-search-ppt-text-color;
          background: $next-search-ppt-bg-color;
        }
        .suggestion-row {
          border-collapse: collapse;
          width: 100%;
          display: table;
          .page-title {
            width: 30%;
            border: 1px solid $next-search-border-color;
            color: $next-search-pt-text-color;
            background: $next-search-pt-bg-color;
            border-left: none;
            display: table-cell;
            text-overflow: ellipsis;
            text-align: left;
            font-weight: 600;
            padding: 5px 5px 0.4rem;
          }
          .suggestion-content {
            border: 1px solid $next-search-border-color;
            white-space: pre-wrap;
            font-weight: 400;
            border-right: none;
            width: 65%;
            display: table-cell;
            padding: 5px;
            color: $next-search-item-text-color;
            .highlight {
              font-weight: bold;
              color: $next-search-hl-text-color;
              background: $next-search-hl-bg-color;
            }
          }
        }
      }
      &.focused {
        background-color: $next-search-item-accent-bg-color;
        a {
          .suggestion-row {
            .suggestion-content {
              color: $next-search-item-accent-text-color;
              .highlight {
                color: $next-search-hl-accent-text-color;
                background: $next-search-hl-accent-bg-color;
              }
            }
          }
        }
      }
    }
  }
  @media (max-width: $MQNarrow) {
    .search-box {
      input {
        cursor: pointer;
        width: 0;
        border-color: transparent;
        position: relative;
        &:focus {
          cursor: text;
          left: 0;
          width: 10rem;
        }
      }
    }
  }
  @media all and (-ms-high-contrast: none) {
    .search-box input {
      height: 2rem;
    }
  }
  @media (max-width: $MQNarrow) and (min-width: $MQMobile) {
    .search-box {
      .suggestions {
        left: 0;
      }
    }
  }
  @media (max-width: $MQMobile) {
    .search-box {
      margin-right: 0;
      input {
        left: 1rem;
        .suggestions {
          right: 0;
        }
      }
    }
  }
  @media (max-width: $MQMobileNarrow) {
    .search-box {
      .suggestions {
        width: calc(100vw - 4rem);
      }

      input:focus {
        width: 8rem;
      }
    }
  }
</style>
