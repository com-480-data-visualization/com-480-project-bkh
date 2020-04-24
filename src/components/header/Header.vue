<style scoped lang="scss">
.navbar-default {
  background-color: #f8f8f8;
  border-color: #e7e7e7;
}
.navbar-default .navbar-nav > li > a {
  color: #777;
}
</style>

<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <!--fixed="top"-->
    <b-navbar-brand href="#">Lord of the rings</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-for="(headerItem, index) in headerItems"
          :key="index"
          :href="headerItem.ref"
          >{{ headerItem.name }}</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./Header.ts"></script>
