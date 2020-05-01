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
    <Map></Map>
    <Script></Script>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "./components/header/Header.vue";
import Map from "./components/map/Map.vue";
import Script from "./components/script/Script.vue";
import Footer from "./components/footer/Footer.vue";

import * as d3 from "d3";

@Component({
  components: {
    Header,
    Map,
    Script,
    Footer
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">

</style>
