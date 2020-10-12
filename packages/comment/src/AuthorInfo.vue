<template>
  <span v-if="author" :aria-label="hint" data-balloon-pos="down">
    <AuthorIcon />
    <span v-text="author" />
  </span>
</template>

<script src="./AuthorInfo" />
