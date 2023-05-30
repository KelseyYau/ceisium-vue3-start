<script setup lang="ts">
// import * as Cesium from 'cesium';
import { onMounted, ref } from 'vue';
import { createModel } from './ModelGlft'

onMounted(() => {
  let ele = ref("cesiumContainer")
  window.viewer = new window.Cesium.Viewer(ele.value, {
    shouldAnimate: true,
    shadows: true,
    imageryProvider: new window.Cesium.ArcGisMapServerImageryProvider({
      url:
        "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/",
    })
  })

  window.viewer.scene.moon.show = false;
  window.viewer.scene.fog.enabled = false;
  window.viewer.scene.sun.show = true;
  window.viewer.scene.skyBox.show = false;
  // 开启日照阴影
  window.viewer.scene.sun.show = true
  window.viewer.scene.globe.enableLighting = true
  window.viewer.terrainShadows = window.Cesium.ShadowMode.RECEIVE_ONLY
			//viewer.shadowMap.softShadows  = true
	window.viewer.shadowMap.darkness = 0.1 //阴影透明度--越大越透明
  var utc = window.Cesium.JulianDate.fromDate(new Date("2023/04/19 1:00:00"));
  //北京时间=UTC+8=GMT+8
  window.viewer.clockViewModel.currentTime = window.Cesium.JulianDate.addHours(utc,8,new window.Cesium.JulianDate());
  createModel(window.viewer, {
    url: "/SampleData/models/CesiumAir/Cesium_Air.glb",
    lng: 113.1232,
    lat: 23.1232,
    height: 5000.0,
    heading: 0,
    pitch: window.Cesium.Math.toRadians(10.0),
    roll: window.Cesium.Math.toRadians(-20.0)
  })

  const scene = window.viewer.scene
  const handler = new window.Cesium.ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction((movement: any) => {
    const pick = scene.pick(movement.endPosition);
    if (
      window.Cesium.defined(pick) &&
      window.Cesium.defined(pick.node) &&
      window.Cesium.defined(pick.mesh)
    ) {
      // Output glTF node and mesh under the mouse.
      console.log(`node: ${pick.node.name}. mesh: ${pick.mesh.name}`);
    }
  }, window.Cesium.ScreenSpaceEventType.MOUSE_MOVE);
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