import React, { useRef } from 'react'
import { Wrld, WrldMap } from 'wrld-react'

export const WorldMap3D = () => {
  var _mouseDownPoint = null
  return (
    <div>
      <WrldMap
        apiKey={'60cb30a44ace77333a9ae9ef8f41f827'}
        containerStyle={{
          width: '1200px',
          height: '800px',
        }}
        mapOptions={{
          center: [51.5152, -0.142],
        }}
        onMapMount={(map) => {}}
        onInitialStreamingComplete={(map) => {
          map.on('mousedown', (event) => {
            _mouseDownPoint = event.layerPoint
          })
          map.on('mouseup', (event) => {
            var mouseUpPoint = event.layerPoint
            var mouseMoved = mouseUpPoint.distanceTo(_mouseDownPoint) > 5

            if (!mouseMoved) {
              console.log(map.buildings)
              var result = map.buildings.findBuildingAtScreenPoint(
                event.layerPoint
              )
              if (result.found) {
                var buildingHighlight = Wrld.buildings
                  .buildingHighlight(
                    Wrld.buildings
                      .buildingHighlightOptions()
                      .highlightBuildingAtScreenPoint(event.layerPoint)
                      .color([255, 255, 0, 128])
                  )
                  .addTo(map)
                setTimeout(function () {
                  buildingHighlight.remove()
                }, 4000)
              }
            }
          })
        }}
        onClick={(e) => console.log(e)}
      ></WrldMap>
    </div>
  )
}
