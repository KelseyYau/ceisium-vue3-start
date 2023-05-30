<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
  let ele = ref("cesiumContainer")
  window.viewer = new window.Cesium.Viewer(ele.value, {
    imageryProvider: new window.Cesium.ArcGisMapServerImageryProvider({
      url:
        "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/",
    })
  })
})
</script>

<template>
  <div id="cesiumContainer" ref="cesiumContainer"></div>
</template>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>