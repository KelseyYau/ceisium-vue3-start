<script setup lang="ts">
import * as Cesium from 'cesium';
import { onMounted, ref } from 'vue';

onMounted(() => {
  let ele = ref("cesiumContainer")
  window.cesium = new Cesium.Viewer(ele.value)
})
</script>

<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>
