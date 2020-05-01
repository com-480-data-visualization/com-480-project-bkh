<style lang="scss">


.group-tick line {
  stroke: #000;
}

.ribbons {
  fill-opacity: 0.67;
}

div#main {
  position: relative;
}

div.tooltip1 {
  position: absolute;
  text-align: center;
  padding: 5px 20px;
  font-size: 16px;
  font-family: Arial;
  background: #f2f2f2;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}

 div.tooltip2 {
  position: absolute;
  text-align: left;
  width: 500px;
  height: 500px;
  padding: 2px;
  font-size: 16px;
  font-family: Arial;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
}

fieldset {
  width: 550px;
}

 legend {
  text-align: center;
  font-size: 20px;
  color: #423127;
}

 li {
  margin: 8px;
  list-style: none;
}
</style>
<template>
  <div id="script"></div>
</template>
<script lang="ts" src="./Script.ts"></script>
