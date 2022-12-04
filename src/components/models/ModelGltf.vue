<script setup lang="ts">
import * as Cesium from 'cesium';
import { onMounted, ref } from 'vue';
import { createModel } from './ModelGlft'

onMounted(() => {
  let ele = ref("cesiumContainer")
  window.viewer = new Cesium.Viewer(ele.value, {
    shouldAnimate: true,
    shadows: true,
    imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
      url:
        "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/",
    })
  })

  createModel(window.viewer, {
    url: "/SampleData/models/CesiumAir/Cesium_Air.glb",
    lng: 113.1232,
    lat: 23.1232,
    height: 5000.0,
    heading: 0,
    pitch: Cesium.Math.toRadians(10.0),
    roll: Cesium.Math.toRadians(-20.0)
  })

  const scene = window.viewer.scene
  const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction((movement) => {
    const pick = scene.pick(movement.endPosition);
    if (
      Cesium.defined(pick) &&
      Cesium.defined(pick.node) &&
      Cesium.defined(pick.mesh)
    ) {
      // Output glTF node and mesh under the mouse.
      console.log(`node: ${pick.node.name}. mesh: ${pick.mesh.name}`);
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
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