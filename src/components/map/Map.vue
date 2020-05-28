<style lang="scss">
.land {
  fill: rgb(245, 245, 245);
  stroke: #76aeb6;
  stroke-width: 1.5;
}
.river {
  fill: none;
  stroke: rgb(30, 144, 255);
  stroke-width: 0.4px;
}
.road {
  fill: none;
  stroke: grey;
  stroke-width: 0.4px;
}
.lake {
  fill: rgb(30, 144, 255);
}
.forest {
  fill: green;
}
.text {
  font-family: Uncial Antiqua;
}
.trip {
  stroke-width: 2px;
  fill: none;
  stroke: red;
  stroke-dasharray: 1500;
  stroke-dashoffset: 1500;
  animation: draw 10s linear forwards;
}
@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
.mountain {
  fill: brown;
}
</style>

<style scoped lang="scss">
.map-container {
  width: 100%;
  position: relative;
}

.zoom-btn-container {
  position: absolute;
  bottom: 10px;
  left: 20px;
  z-index: 100;
}
.zoom-btn-container::v-deep .b-icon.bi {
  height: 22px;
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
}
h3 {
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

<template>
  <b-container fluid>
    <b-row>
      <b-col cols="10">
        <div class="zoom-btn-container">
          <b-icon
            icon="plus-square-fill"
            variant="dark"
            scale="2"
            @click="zoomIn"
          ></b-icon>
          <b-icon
            icon="dash-square-fill"
            variant="dark"
            scale="2"
            @click="zoomOut"
          ></b-icon>
        </div>
        <div class="map-container">
          <svg
            id="mapsvg"
            preserveAspectRatio="xMidYMid"
            height="750"
            width="1200"
            viewBox="0 0 7850 11200"
          >
            <defs>
              <symbol id="relief-mount-6" viewBox="-3 -10 40 40">
                <polygon
                  fill="#96989A"
                  stroke="#96989A"
                  stroke-width=".2"
                  points=".147,15.0385 1.6442,13.0243 3.3151,11.642 4.1434,10.0376 4.9806,9.9224 6.8955,7.0031 8.6059,5.1501 9.0229,3.7256 10.0368,2.3148 12.4348,4.6748 14.6687,3.6743 18.1604,1.3295 20.0044,0.1303 23.5192,4.0044 24.3981,3.1572 25.3939,4.067 27.6095,6.6459 28.7754,8.0029 30.309,8.9148 31.4894,10.6345 32.5909,12.0136 33.1688,13.2271 33.746,13.7886 34.1887,14.9298 35.1672,15.7874 33.2794,16.9613 30.2507,17.8494 27.9082,18.0142 25.5124,18.5408 24.1945,18.5184 22.0666,17.9886 20.7224,17.5522 19.3848,17.2692 18.0714,17.4921 16.8448,17.9273 14.923,18.4833 11.9731,18.4984 8.0901,18.2949 4.9114,17.2688 1.9652,16.102 "
                />
                <polygon
                  fill="#BDBFC1"
                  points=".147,15.0385 1.6442,13.0243 3.3151,11.642 4.1434,10.0376 4.7098,10.3352 6.8955,7.0031 8.6059,5.1501 9.0229,3.7256 10.0368,2.3148 12.2006,4.7797 14.6687,3.6743 18.1604,1.3295 20.0044,0.1303 23.2333,4.2797 24.3981,3.1572 25.3939,4.067 27.6095,6.6459 28.7754,8.0029 30.309,8.9148 31.4894,10.6345 32.5909,12.0136 33.1688,13.2271 33.746,13.7886 34.1887,14.9298 35.1672,15.7874 33.2794,16.9613 30.2507,17.8494 27.9082,18.0142 25.5124,18.5408 24.1945,18.5184 22.0666,17.9886 20.7224,17.5522 19.3848,17.2692 18.0714,17.4921 16.8448,17.9273 14.923,18.4833 11.9731,18.4984 8.0901,18.2949 4.9114,17.2688 1.9652,16.102 "
                />
                <polygon
                  fill="#999999"
                  points="12.2006,4.7797 10.0368,2.3148 10.1151,7.3804 11.4163,8.759 12.2026,10.4436 11.8763,13.7594 14.5464,16.7619 15.0352,18.4509 19.3848,17.2692 16.5848,14.5291 17.904,13.4655 15.4923,10.5203 14.5256,8.5177 12.9142,7.5924 13.9488,6.222 "
                />
                <polygon
                  fill="#999999"
                  points="23.2333,4.2797 20.0044,0.1303 19.9564,3.3216 19.4305,3.5239 18.8945,6.0413 19.0996,7.1979 19.8037,9.1018 20.5765,9.6521 20.1327,11.8442 20.4782,12.7337 22.7768,14.5969 22.0989,12.9428 22.0752,12.3141 22.7092,10.7332 22.4605,9.1605 22.6231,8.3019 22.2254,6.9131 23.5867,5.0457 "
                />
                <polygon
                  fill="#999999"
                  points="35.1672,15.7874 34.1887,14.9298 33.746,13.7886 33.1688,13.2271 32.5909,12.0136 30.309,8.9148 28.7754,8.0029 25.3939,4.067 24.3981,3.1572 24.8,5.3815 23.8709,6.152 25.4726,8.5929 25.9139,10.398 25.7241,12.6056 24.6322,14.2344 24.9293,15.4655 26.199,16.3424 28.0999,16.8168 28.1829,17.9949 30.2507,17.8494 33.2794,16.9613 "
                />
              </symbol>

              <symbol id="relief-deciduous-1" viewBox="0 0 100 100">
                <path
                  d="m50,52 v7 h1 v-7 h-0.5 q13,-7 0,-16 q-13,9 0,16"
                  fill="green"
                  stroke="#5c5c70"
                ></path>
                <path
                  d="m50,52 q-12,-7 0,-16 q-3.5,10 0,15.5"
                  fill="green"
                ></path>
              </symbol>
            </defs>

            <g id="viewbox"></g>
          </svg>
        </div>
      </b-col>
      <b-col cols="2">
        <typeahead
          v-model="places"
          search-field-name="nameEnNormalized"
          class="search-bar"
          @select="selectPlace"
          placeholder="Find place"
        />
        <h3>Hobbit Trips</h3>
        <div>
          <b-form-checkbox-group
            id="hobbitTrips"
            v-model="hobbitTripsSelected"
            :options="hobbitTrips"
            stacked
            @change="selectTrip"
          ></b-form-checkbox-group>
        </div>
        <h3>Lord of the Rings Trips</h3>
        <div>
          <b-form-checkbox-group
            id="LotrTrips"
            v-model="LotrTripsSelected"
            :options="LotrTrips"
            stacked
            @change="selectTrip"
          ></b-form-checkbox-group>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts" src="./Map.ts"></script>
