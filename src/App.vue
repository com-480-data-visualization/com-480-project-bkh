<template>
  <div id="app">
    <Header></Header>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome123 to Your Vue.js + TypeScript App" />
    <p>app to view them all</p>
    <Map></Map>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/header/Header.vue";
import Map from "./components/map/Map.vue";

import * as d3 from "d3";

@Component({
  components: {
    HelloWorld,
    Header,
    Map
  }
})
export default class App extends Vue {
  constructor() {
    super();
    d3.select("body")
      .selectAll("p")
      .data([4, 8, 15, 16, 23, 42])
      .enter()
      .append("p")
      .text(function(d) {
        return "I’m number " + d + "!";
      });
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
