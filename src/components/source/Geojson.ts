import type { Viewer, Entity } from "cesium"

export function createGeojsonSource(viewer: Viewer, sourceOptions: any) {
  const dataSource:any = window.Cesium.GeoJsonDataSource.load(sourceOptions.data, {
    fill: window.Cesium.Color.WHITE,
    stroke: window.Cesium.Color.RED,//相当于polygon的outlineColor
    strokeWidth: 5,//相当于polygon的outlineWidth
    clampToGround: true//是否贴地
  })
  viewer.dataSources.add(dataSource).then(function (dataSource) {
    const entities = dataSource.entities.values
	//修改entity样式
    for (let i = 0; i < entities.length; i++) {
      const entity: Entity = entities[i]
      entity.polygon.extrudedHeight = entity.properties.Floor * 5
      entity.polyline = {
        positions: entity.polygon.hierarchy._value.positions,
        width: 2,
        material: window.Cesium.Color.fromCssColorString('#ff0000')
      }
    }
  })
  viewer.zoomTo(dataSource)
}