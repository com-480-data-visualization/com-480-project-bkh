<template>
  <div id="app">
    <Header></Header>
    <div>
      <b-img
        src="https://www.ecopetit.cat/wpic/mpic/49-491631_fellowship-of-the-ring-line.jpg"
        fluid-grow
        alt="Responsive image"
      ></b-img>
    </div>
    <!-- <p>app to view them all</p> -->
    <Script></Script>
    <Map></Map>
    <Timeline></Timeline>
    <Eventse></Eventse>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/header/Header.vue";
import Map from "./components/map/Map.vue";
import Script from "./components/script/Script.vue";
import Footer from "./components/footer/Footer.vue";
import Eventse from "./components/eventse/Eventse.vue";
import Timeline from "./components/timeline/Timeline.vue";

import * as d3 from "d3";

@Component({
  components: {
    Header,
    Map,
    Script,
    Timeline,
     Eventse,
    Footer
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
