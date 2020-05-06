<style scoped lang="scss"></style>

<template>
  <vue-bootstrap-typeahead
    v-model="searchText"
    :data="searchData"
    @hit="select"
    :placeholder="placeholder"
  />
</template>

<script lang="ts" src="./Typeahead.ts"></script>
