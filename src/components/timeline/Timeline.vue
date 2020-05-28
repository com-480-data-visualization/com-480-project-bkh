<style type="text/css">
svg {
  font: 11px sans-serif;
}
.brush .extent {
  stroke: black;
  fill: white;
  fill-opacity: 0.6;
  shape-rendering: crispEdges;
}
</style>
<template>
  <b-container fluid id="container-kings">
    <b-row>
      <b-col cols="10">
        <div id="Timeline" style="width: 100%">
          <svg id="Timeline-svg-container" width="1000" height="600"></svg>
        </div>
      </b-col>
      <b-col cols="2">
        <h3>Character</h3>
        <div>
          <b-form-checkbox-group
            id="heroes"
            v-model="heroesSelected"
            :options="heroes"
            stacked
            @change="selectTrip"
          ></b-form-checkbox-group>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./Timeline.ts"></script>
