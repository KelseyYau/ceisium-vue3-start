import type { Scene, Viewer, Model } from "cesium"

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
  const hpr = new window.Cesium.HeadingPitchRoll(heading, pitch, roll)

  const origin = window.Cesium.Cartesian3.fromDegrees(
    lng,
    lat,
    height
  );
  console.log(origin)
  const modelMatrix = window.Cesium.Transforms.headingPitchRollToFixedFrame(
    origin, 
    hpr
  )
  scene.primitives.removeAll()
  const model = scene.primitives.add(window.Cesium.Model.fromGltf({
    url,
    modelMatrix: modelMatrix,
    minimumPixelSize: 128
  }))

  model.readyPromise.then((gltf: Model) => {
    
    //   new window.Cesium.Color(255, 255, 255),
    //   1.0
    // );
    // model.colorBlendMode =  window.Cesium.ColorBlendMode["HIGHLIGHT"]
    // model.colorBlendAmount = 0.5

    // Play and loop all animations at half-speed
    gltf.activeAnimations.addAll({
      multiplier: 0.5,
      loop: window.Cesium.ModelAnimationLoop.REPEAT,
    });
    console.log(gltf)
    const camera = viewer.camera;
    // Zoom to model
    const controller = scene.screenSpaceCameraController;
    const r =
      2.0 *
      Math.max(gltf.boundingSphere.radius, camera.frustum.near);
    controller.minimumZoomDistance = r * 0.5;

    const center = window.Cesium.Matrix4.multiplyByPoint(gltf.modelMatrix, gltf.boundingSphere.center, new window.Cesium.Cartesian3());
    const heading = window.Cesium.Math.toRadians(230.0);
    const pitch = window.Cesium.Math.toRadians(-20.0);
    console.log(center, heading, pitch)
    camera.lookAt(
      center,
      new window.Cesium.HeadingPitchRange(heading, pitch, r * 2.0)
    );

    // 解除lookat
    camera.lookAtTransform(window.Cesium.Matrix4.IDENTITY)
  }).catch((error: Error) => {
    window.alert(error)
  })
  return model
}