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
          did Frodo and Sam went? Why Minas Tirith strategic position was so
          importand both for Mordor and Allies? Just use scroll wheel of your
          mouse to zoom, use search bar to find specific place of interest or
          display path of every hero using checkboxes.
        </h5>
      </div>
      <Map></Map>
      <div class="text-container" id="TimelineAnchor">
        <h2>Timeline</h2>
        <h5>
          The history of Tolkien’s universe is complicated, to say the least.
          We’ve put together this timeline to take you through the major
          storyline of Lord of the Rings.
        </h5>
        <br />
        <h5>
          In the following visualization you can explore the story of our heroes
          and interaction between eachother. When did Frodo and Gollum meet for
          the first time? When did Gandalf become white ? and many other
          questions... Simply scroll to zoom and drag the graph to move in
          timeline, and move your mouse over the dots to see event descriptions.
        </h5>
      </div>
      <Timeline></Timeline>

      <div class="text-container" id="KingsAnchor">
        <h2>Kings of Gondor</h2>
        <h5>
          Gondor is the largest kingdom of men in the west of Middle-earth in
          Tolkien’s epic Lord of the Rings series, and the center of the
          military strength that will fight Sauron at the end of the Third Age.
          Gondor was in a very crucial position, in order to guard Middle Earth
          and because of Gondor's proximity to Mordor, its military forces had
          to be proficiently trained and vigilantly on guard at all times.
          Because of this, they were arguably the strongest country that opposed
          Sauron.
        </h5>
        <br />
        <h5>
          In the following visualization you can explore the rulers of this
          might Kingdom. Which king has the longest ruling time? When was Gondor
          re-founded after it's destruction. Simply you can select the area from
          the above graph to focus, and as you move the rectangle focus area
          will also shift. If want to see full names of the kings just click on
          the corresponding recctangle in the larger graph.
        </h5>
      </div>
      <Eventse></Eventse>
      <TimelineNew></TimelineNew>
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
import TimelineNew from "./components/timeline/TimelineNew.vue";

import * as d3 from "d3";

@Component({
  components: {
    Header,
    Map,
    Script,
    Timeline,
    Eventse,
    Footer,
    TimelineNew
  }
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
