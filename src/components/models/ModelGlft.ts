import type { Scene, Viewer } from "cesium"
import * as Cesium from 'cesium';

interface ModelOptions {
  url: string,
  lng: number,
  lat: number,
  height: number,
  heading: number,
  pitch: number,
  roll: number
}

export function createModel(viewer: Viewer, modelOptions: ModelOptions):void {
  const scene: Scene = viewer.scene
  const { url, height, heading, pitch, roll, lng, lat } = modelOptions
  console.log(modelOptions)
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)

  const origin = Cesium.Cartesian3.fromDegrees(
    lng,
    lat,
    height
  );
  console.log(origin)
  const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    origin, 
    hpr
  )
  scene.primitives.removeAll()
  const model = scene.primitives.add(Cesium.Model.fromGltf({
    url,
    modelMatrix: modelMatrix,
    minimumPixelSize: 128
  }))

  model.readyPromise.then((gltf: Cesium.Model) => {
    
    //   new Cesium.Color(255, 255, 255),
    //   1.0
    // );
    // model.colorBlendMode =  Cesium.ColorBlendMode["HIGHLIGHT"]
    // model.colorBlendAmount = 0.5

    // Play and loop all animations at half-speed
    gltf.activeAnimations.addAll({
      multiplier: 0.5,
      loop: Cesium.ModelAnimationLoop.REPEAT,
    });
    console.log(gltf)
    const camera = viewer.camera;
    // Zoom to model
    const controller = scene.screenSpaceCameraController;
    const r =
      2.0 *
      Math.max(gltf.boundingSphere.radius, camera.frustum.near);
    controller.minimumZoomDistance = r * 0.5;

    const center = Cesium.Matrix4.multiplyByPoint(gltf.modelMatrix, gltf.boundingSphere.center, new Cesium.Cartesian3());
    const heading = Cesium.Math.toRadians(230.0);
    const pitch = Cesium.Math.toRadians(-20.0);
    console.log(center, heading, pitch)
    camera.lookAt(
      center,
      new Cesium.HeadingPitchRange(heading, pitch, r * 2.0)
    );
  }).catch((error: Error) => {
    window.alert(error)
  })
  return model
}