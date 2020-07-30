import React, { useEffect, useRef } from 'react';
import { loadModules } from 'esri-loader';
import { useTracker } from 'meteor/react-meteor-data';
import { MapReactArcgis } from '../api/maps'
import './maparcgis.css'
export const MapArcgis = () => {
  const mapRef = useRef();
  // const { mapArcgis } = useTracker(() => {
  //   Meteor.subscribe('maps');
  //   return ({
  //     mapArcgis: MapReactArcgis.find({}).fetch()
  //   })
  // });

  useEffect(
    () => {
      // lazy load the required ArcGIS API for JavaScript modules and CSS
      loadModules([
        'esri/Map',
        "esri/views/SceneView",
        "esri/layers/TileLayer",
        "esri/layers/FeatureLayer",
        "esri/widgets/AreaMeasurement3D",
        "esri/widgets/DirectLineMeasurement3D",
        "esri/widgets/Legend",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Locate",
        "esri/widgets/Track",
        "esri/Graphic",
        "esri/widgets/LayerList",
        "esri/widgets/Expand",
        "esri/layers/ImageryLayer",
        "esri/Basemap",
        "esri/layers/MapImageLayer",
        "esri/request",
        "esri/Ground",
        "esri/layers/ElevationLayer",
        "esri/layers/BaseElevationLayer"
      ], { css: true })
        .then(([
          ArcGISMap,
          SceneView,
          TileLayer,
          FeatureLayer,
          AreaMeasurement3D,
          DirectLineMeasurement3D,
          Legend,
          BasemapToggle,
          Locate,
          Track,
          Graphic,
          LayerList,
          Expand,
          ImageryLayer,
          Basemap,
          MapImageLayer,
          esriRequest,
          Ground,
          ElevationLayer,
          BaseElevationLayer
        ]) => {
          // ---------------------tùy chỉnh độ cao mặt đất----------------------//
          var ExaggeratedElevationLayer = BaseElevationLayer.createSubclass({
            properties: {
              exaggeration: 25  
            },
  
            // The load() method is called when the layer is added to the map
            // prior to it being rendered in the view.
  
            load: function () {
              this._elevation = new ElevationLayer({
                url:
                  "//elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer"
              });
  
              // wait for the elevation layer to load before resolving load()
              this.addResolvingPromise(this._elevation.load());
            },
  
            // Fetches the tile(s) visible in the view
            fetchTile: function (level, row, col, options) {
              // calls fetchTile() on the elevationlayer for the tiles
              // visible in the view
              return this._elevation.fetchTile(level, row, col, options).then(
                function (data) {
                  var exaggeration = this.exaggeration;
  
                  // `data` is an object that contains the
                  // the width of the tile in pixels,
                  // the height of the tile in pixels,
                  // and the values of each pixel
                  for (var i = 0; i < data.values.length; i++) {
                    // each value represents an elevation sample for the
                    // given pixel position in the tile. Multiply this
                    // by the exaggeration value
                    data.values[i] = data.values[i] * exaggeration;
                  }
  
                  return data;
                }.bind(this)
              );
            }
          });

          const map = new ArcGISMap({
            basemap: 'hybrid',
            ground: {
              layers: [new ExaggeratedElevationLayer()]
            }
          });
          // var kansasExtent = {
          //   xmin: 20.4937157343,
          //   ymin: 105.397715318,
          //   xmax: 21.4073023782,
          //   ymax: 106.439042396,
          //   spatialReference: {
          //     // autocasts as new SpatialReference()
          //     wkid: 4326
          //   }
          // };

          // var kansasExtent = {
          //   ymin: 20.4937157343,
          //   xmin: 105.397715318,
          //   ymax: 21.4073023782,
          //   xmax: 106.439042396,
          //   spatialReference: {
          //     // autocasts as new SpatialReference()
          //     wkid: 102100
          //   }
          // };

          // load the map view at the ref's DOM node
          const view = new SceneView({
            container: mapRef.current,
            map: map,
            viewingMode: "local",
            // clippingArea: kansasExtent,
            // extent: kansasExtent,
            camera: {
              position: {
                x: 105.885448,
                y: 20.644828,
                z: 25000
              },
              tilt: 65
            }
          });
          // console.log(view.camera.position.tilt)
          view.when(function () {
            document.getElementById("elevationInput").addEventListener("change", updateElevation);
            function updateElevation(ev) {
              // Turn ground layers visibility on/off
              map.ground.layers.forEach(function (layer) {
                layer.visible = ev.target.checked;
                console.log(layer.visible)
              });
              // view.camera.position.tilt = 20;
              // console.log(view.camera.position.tilt)
            }
          });
          // ---------------------bật tắt layer----------------------//
          var layerList = new LayerList({
            view: view
          });

          // ---------------------chú giải----------------------//
          const legend = new Legend({
            view: view
          });

          var url = "http://arcgis204.fimo.com.vn/arcgis/rest/services/DoAmDat?f=pjson";
          esriRequest(url, {
            responseType: "json"
          }).then(function(response){
            // The requested data
            var getData = response.data;
            // console.log(getData)
            for(i of getData.services){
              var stringName = i.name
              // console.log(stringName.indexOf("DoAmDat/kv"))
              if(i.type === "MapServer" && stringName.indexOf("DoAmDat/kv") >= 0){
                var linkData = "http://arcgis204.fimo.com.vn/arcgis/rest/services/"+i.name+"/MapServer/0";
                var layer = new FeatureLayer({
                  url: linkData,
                  popupTemplate : {
                    title: "Thông tin điểm click:",
                    content: [{
                      type: "fields", // Autocasts as new FieldsContent()
                      // Autocasts as new FieldInfo[]
                      fieldInfos: [
                        {
                        fieldName: "timegps",
                        label: "timegps",
                        // Autocasts as new FieldInfoFormat()
                        format: {
                          digitSeparator: true
                        }
                        },
                        {
                          fieldName: "timestartu",
                          label: "timestartu",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "timesyncin",
                          label: "timesyncin",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "yaw",
                          label: "yaw",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "pitch",
                          label: "pitch",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "roll",
                          label: "roll",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "qtn1",
                          label: "qtn1",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "qtn2",
                          label: "qtn2",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "qtn3",
                          label: "qtn3",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "qtn4",
                          label: "qtn4",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "angularrat",
                          label: "angularrat",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "angularr_1",
                          label: "angularr_1",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "angularr_2 ",
                          label: "angularr_2 ",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "latitude",
                          label: "latitude",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "longitude",
                          label: "longitude",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "altitude",
                          label: "altitude",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "velocity1",
                          label: "velocity1",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "velocity2",
                          label: "velocity2",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "velocity3",
                          label: "velocity3",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "accel1",
                          label: "accel1",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "accel2",
                          label: "accel2",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "accel3",
                          label: "accel3",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "timeutc_da",
                          label: "timeutc_da",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        },
                        {
                          fieldName: "adc",
                          label: "adc",
                          // Autocasts as new FieldInfoFormat()
                          format: {
                            digitSeparator: true
                          }
                        }
                      ]
                    }]
                  }
                })

                map.add(layer);
              }
              else if(i.type === "MapServer"&& stringName.indexOf("DoAmDat/kv") == -1 ){
                var linkData = "http://arcgis204.fimo.com.vn/arcgis/rest/services/"+i.name+"/MapServer";
                // console.log(i)
                var layer = new MapImageLayer({
                url: linkData,
                });
                map.add(layer);
              }
            }
          });

          var bgExpand1 = new Expand({
            view: view,
            content: layerList,
            expanded: true
          });
          view.ui.add(bgExpand1, "top-right");

          var bgExpand2 = new Expand({
            view: view,
            content: legend,
            expanded: true
          });
          view.ui.add(bgExpand2, "bottom-left");
          view.on("change ", function(event) {
            console.log("click event: ", event);
          });
          return () => {
            if (view) {
              // destroy the map view
              view.container = null;
            }
          };
        });
    }
  );

  return (
    <div>
      <div className="webmap" ref={mapRef} />
      <div id="elevationDiv" className="esri-widget">
        <label
        >Elevation: <input id="elevationInput" type="checkbox" defaultChecked="yes"/>
        </label>
      </div>
    </div>
  )
};