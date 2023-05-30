import { Viewer } from './Cesium.d';
declare global {
  interface Window {
    Cesium: Cesium;
    viewer: Viewer;
  }
  
}