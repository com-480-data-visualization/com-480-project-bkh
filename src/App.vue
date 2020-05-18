<style scoped lang="scss">
.global-container {
  padding-left: 40px;
  padding-right: 40px;
}
.text-container {
  margin-top: 100px;
  margin-bottom: 25px;
}
.text-container h2 {
  font-family: Uncial Antiqua;
}
.text-container h5 {
  font-weight: normal;
  font-size: 20px;
}
</style>

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
    <div class="global-container">
      <Script></Script>

      <div class="text-container" id="MapAnchor">
        <h2>One map to view them all</h2>
        <h5>
          How does map of the Middle-earth look like? It appears that J. R. R.
          Tolkien made a detailed maps of the Arda, world of Middle-earth, in
          his book `Silmarillion`, many people call it as a Bible of the
          Middle-earth. Also we found out that author described 3 different
          ages. We tried to visualize last one as all events from `Hobbit` and
          `Lord of the Rings` took place during this period.
        </h5>
        <br />
        <h5>
          In the following visualization you can explore many questions. Where
          is Lonely Mountain with the treasure of Smaug? How far away from home
          did Frodo and Sam went? Why Minas Tirith strategic position was so importand both for Mordor and Allies?
          Just use scroll wheel of your mouse to zoom,
          use search bar to find specific place of interest or display path of
          every hero using checkboxes.
        </h5>
      </div>
      <Map></Map>
      <Timeline></Timeline>
      <Eventse></Eventse>
    </div>
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
