<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { createGeojsonSource } from './Geojson'

onMounted(() => {
  let ele = ref("cesiumContainer")
  const tiandituTk='56f692633b0e3ba1b542f40e02922d32';
  // 服务负载子域
  const subdomains=['0','1','2','3','4','5','6','7'];
  window.viewer = new window.Cesium.Viewer(ele.value, {
    shouldAnimate: true,
    shadows: true,
    imageryProvider: new window.Cesium.WebMapTileServiceImageryProvider({
      //影像底图
      url: "http://t{s}.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk="+tiandituTk,
      subdomains: subdomains,
      layer: "tdtImgLayer",
      style: "default",
      format: "image/jpeg",
      tileMatrixSetID: "GoogleMapsCompatible",//使用谷歌的瓦片切片方式
      show: true
    })
  })

  const scene = window.viewer.scene
  const handler = new window.Cesium.ScreenSpaceEventHandler(scene.canvas);
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
  var utc= window.Cesium.JulianDate.fromDate(new Date("2023/04/19 1:00:00"));
    //北京时间=UTC+8=GMT+8
    window.viewer.clockViewModel.currentTime = window.Cesium.JulianDate.addHours(utc,8,new window.Cesium.JulianDate());
    // window.viewer.scene.light = new window.Cesium.DirectionalLight({ //去除时间原因影响模型颜色
    //     direction: new window.Cesium.Cartesian3(0.35492591601301104, -0.8909182691839401, -0.2833588392420772)
    // })
  createGeojsonSource(window.viewer, {
    data: '/SampleData/geojson/tainhebuilding.geojson'
  })
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
