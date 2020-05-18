<style scoped lang="scss"></style>

<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
    <!--fixed="top"-->
    <b-navbar-brand href="#">Lord of the rings</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          v-for="(headerItem, index) in headerItems"
          :key="index"
          href="#"
          @click="itemClicked(headerItem)"
          >{{ headerItem.name }}</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts" src="./Header.ts"></script>
