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
    <title>Example OSM and Norway (topo4)</title>
</head>

<body>
    <div id="map" class="map"></div>
    <form class="form-inline">
      <label for="type">Shape type: &nbsp;</label>
      <select class="form-control mr-2 mb-2 mt-2" id="type">
        <option value="Circle">Circle</option>
        <option value="Box">Box</option>
        <option value="None">None</option>
      </select>
      <input class="form-control mr-2 mb-2 mt-2" type="button" value="Undo" id="undo">
    </form>
    
    <script type="text/javascript">

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

        const source = new ol.source.Vector({wrapX: false});
        const vector = new ol.layer.Vector({
            source: source,
        });

        var map = new ol.Map({
            target: 'map',
            layers: [osm, nk, vector],
            view: new ol.View({
                center: ol.proj.fromLonLat([13.41, 65.42]),
                zoom: 6
            })
        });

        // draw a circle
        const typeSelect = document.getElementById('type');

        let draw;
        function addInteraction(){
            let value = typeSelect.value;
            if (value !== 'None'){
                let geometryFunction;
                if (value === 'Box'){
                    value = 'Circle';
                    geometryFunction = ol.interaction.Draw.createBox();
                } 
                draw = new ol.interaction.Draw({
                    source: source,
                    type: value,
                    geometryFunction: geometryFunction,
                });
                map.addInteraction(draw);
            }
        }
        /**
         * Handle change event.
         */
        typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
        };

        document.getElementById('undo').addEventListener('click', function () {
        draw.removeLastPoint();
        });

        addInteraction();
    </script>
</body>

</html>
`

export default htmlScript