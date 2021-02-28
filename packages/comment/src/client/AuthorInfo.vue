<template>
  <span v-if="author" :aria-label="hint" data-balloon-pos="down">
    <AuthorIcon />
    <span property="author" v-text="author" />
  </span>
</template>

<script src="./AuthorInfo" />
