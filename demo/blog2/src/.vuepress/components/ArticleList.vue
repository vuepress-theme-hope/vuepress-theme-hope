<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>
    <article
      v-for="{ info, path } in items"
      class="article"
      @click="$router.push(path)"
    >
      <header class="title">
        {{
          (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : "") +
          info.title
        }}
      </header>
      <hr />
      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>
        <span v-if="info.date && !isTimeline" class="date"
          >Date: {{ new Date(info.date).toLocaleDateString() }}</span
        >
        <span v-if="info.category" class="category"
          >Category: {{ info.category.join(", ") }}</span
        >
        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(", ") }}</span>
      </div>
      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>

<script lang="ts" setup>
interface Article {
  path: string;
  info: {
    title: string;
    author?: string;
    date: string;
    category?: string[];
    tag?: string[];
    excerpt?: string;
  };
}

withDefaults(
  defineProps<{
    items: Article[];
    isTimeline: boolean;
  }>(),
  { items: () => [] },
);
</script>
<style lang="scss">
@use "@vuepress/theme-default/styles/mixins";

.article-wrapper {
  @include mixins.content_wrapper;
  text-align: center;
}

.article {
  position: relative;

  box-sizing: border-box;

  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--c-border);
  border-radius: 0.4rem;
  color: var(--c-text);

  text-align: left;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .title {
    position: relative;

    display: inline-block;

    font-size: 1.28rem;
    line-height: 2rem;

    &::after {
      content: "";

      position: absolute;
      bottom: 0;
      left: 0;

      width: 100%;
      height: 2px;

      background: var(--c-brand);

      visibility: hidden;

      transition: transform 0.3s ease-in-out;
      transform: scaleX(0);
    }

    &:hover {
      &::after {
        visibility: visible;
        transform: scaleX(1);
      }
    }

    a {
      color: inherit;
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;

    > span {
      margin-right: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }

    h2 {
      font-size: 1.2em;
    }

    h3 {
      font-size: 1.15em;
    }
  }
}
</style>
