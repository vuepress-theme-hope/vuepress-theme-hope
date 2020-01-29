<template>
  <div id="pagination">
    <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink">Prev</router-link>
    <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink">Next</router-link>
  </div>
</template>