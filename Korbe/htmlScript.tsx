
const htmlScript =
`
<html lang="en">

<head>
    <link rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/css/ol.css" type="text/css">
    <style>
        .map {
            height: 95vh;
            width: 100%;
        }
    </style>
    <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.3.1/build/ol.js"></script>
    <script src="https://unpkg.com/elm-pep"></script>
    <script type="text/javascript" src="storeJson.ts"></script>
    <title>Example OSM and Norway (topo4)</title>
</head>

<body>
    <div id="map" class="map"></div>
    <form class="form-inline">
      <label for="type">Shape type: &nbsp;</label>
      <select class="form-control mr-2 mb-2 mt-2" id="type">
        <option value="Polygon">Polygon</option>
        <option value="Circle">Circle</option>
      </select>
      <input class="form-control mr-2 mb-2 mt-2" type="button" value="Undo" id="undo">
    </form>
    <button onclick="addInteractions()"> Beskjær </button>
    <div>
    <p id="text">he</p>
    </div>
    <script  type="text/javascript">
        // OpenStreetMap Layer
        const osm = new ol.layer.Tile({
            source: new ol.source.OSM()
        })

        // Norge topo3 layer
        const nk = new ol.layer.Tile({
            source: new ol.source.XYZ({
                url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}',
                attributions: '<a href="http://www.kartverket.no/">Kartverket</a>'
            })
        })
        // var geoDataUrl = '/data/' + '{{percorso._id}}' + '.json';
        const source = new ol.source.Vector();
        const vector = new ol.layer.Vector({
            source: source,
            format: new ol.format.GeoJSON(),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#BF0404',
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#BF0404',
                    })
                })
            })
        });

        const extent = ol.proj.get('EPSG:3857').getExtent().slice();
        extent[0] += extent[0];
        extent[2] += extent[2];

        var map = new ol.Map({
            target: 'map',
            layers: [osm, nk, vector],
            view: new ol.View({
                center: ol.proj.transform([13.41, 65.42], 'EPSG:4326', 'EPSG:3857'),
                zoom: 6,
                extent,
            }),
        });

        const modify = new ol.interaction.Modify({source: source});
        map.addInteraction(modify);

        let draw, snap, area;
        const typeSelect = document.getElementById('type');

        function addInteractions(){
            draw = new ol.interaction.Draw({
                source: source,
                type: typeSelect.value,
            });

            //storing as geoJSON format
            var features = source.getFeaturesCollection();
            draw.on('drawend', function(e) {
                let parser = new ol.format.GeoJSON();
                console.log(parser);
                area = parser.writeFeatureObject(e.feature, {featureProjection: 'EPSG:3857'});
                
                
                var jsonString = JSON.stringify(area);
                window.ReactNativeWebView.postMessage(jsonString);
                
                
            });
            map.addInteraction(draw);
            snap = new ol.interaction.Snap({source: source});
            map.addInteraction(snap);

        }


        /**
         * Handle change event.
         */
        typeSelect.onchange = function () {
        map.removeInteraction(draw);
        map.removeInteraction(snap)
        addInteractions();
        };

        // document.getElementById('undo').addEventListener('click', function () {
        // draw.removeLastPoint();
        // });

        addInteractions();

    </script>
    
</body>

</html>
`

export default htmlScript