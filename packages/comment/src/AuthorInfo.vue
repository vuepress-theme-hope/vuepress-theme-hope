<template>
  <span v-if="author" :title="hint">
    <AuthorIcon />
    <span v-text="author" />
  </span>
</template>

<script src="./AuthorInfo" />
