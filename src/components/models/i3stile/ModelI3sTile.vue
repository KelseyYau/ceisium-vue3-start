<script setup lang="ts">
import type Viewer from 'cesium/Source/Widgets/Viewer/Viewer';
import { onMounted, ref } from 'vue';

onMounted(() => {
  let ele = ref("cesiumContainer")
  window.viewer = new window.Cesium.Viewer(ele.value, {
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
  loadI3sTile(window.viewer)
})

async function loadI3sTile(viewer: Viewer) {
  const tours = {
    "San Francisco":"https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/SanFrancisco_3DObjects_1_7/SceneServer/layers/0",
  }

  try {
  // Initialize a terrain provider which provides geoid conversion between gravity related (typically I3S datasets) and ellipsoidal based
  // height systems (Cesium World Terrain).
  // If this is not specified, or the URL is invalid no geoid conversion will be applied.
  // The source data used in this transcoding service was compiled from https://earth-info.nga.mil/#tab_wgs84-data and is based on EGM2008 Gravity Model
  console.log(window.Cesium.ArcGISTiledElevationTerrainProvider.fromUrl)
  const geoidService = await window.Cesium.ArcGISTiledElevationTerrainProvider.fromUrl(
    "https://tiles.arcgis.com/tiles/z2tnIkrLQ2BRzr6P/arcgis/rest/services/EGM2008/ImageServer"
  );
  // Create i3s and Cesium3DTileset options to pass optional parameters useful for debugging and visualizing
  const cesium3dTilesetOptions = {
    skipLevelOfDetail: false,
    debugShowBoundingVolume: false,
  };
  const i3sOptions = {
    traceFetches: false, // for tracing I3S fetches
    geoidTiledTerrainProvider: geoidService, // pass the geoid service
    cesium3dTilesetOptions: cesium3dTilesetOptions, // options for internal Cesium3dTileset
  };

  // Create I3S data provider
  const i3sProvider = await window.Cesium.I3SDataProvider.fromUrl(
    tours["San Francisco"],
    i3sOptions
  );

  // Add the i3s layer provider as a primitive data type
  viewer.scene.primitives.add(i3sProvider);

  // Center camera on I3S once it's loaded
  const center = window.Cesium.Rectangle.center(i3sProvider.extent);
  center.height = 10000.0;
  viewer.camera.setView({
    destination: window.Cesium.Ellipsoid.WGS84.cartographicToCartesian(center),
  });
} catch (error) {
  console.log(
    `There was an error creating the I3S Data Provider: ${error}`
  );
}
}
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