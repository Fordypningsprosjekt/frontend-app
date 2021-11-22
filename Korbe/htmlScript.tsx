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
    <title>Example OSM and Norway (topo4)</title>
</head>

<body>
    <div id="map" class="map"></div>
    
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

        var map = new ol.Map({
            target: 'map',
            layers: [osm, nk],
            view: new ol.View({
                center: ol.proj.fromLonLat([13.41, 65.42]),
                zoom: 6
            })
        });

        nk.on('prerender', function (event) {
            const ctx = event.context;
          
            // calculate the pixel ratio and rotation of the canvas
            const matrix = event.inversePixelTransform;
            const canvasPixelRatio = Math.sqrt(
              matrix[0] * matrix[0] + matrix[1] * matrix[1]
            );
            const canvasRotation = -Math.atan2(matrix[1], matrix[0]);
            ctx.save();
            // center the canvas and remove rotation to position clipping
            ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
            ctx.rotate(-canvasRotation);
          
            ctx.scale(5 * canvasPixelRatio, 5 * canvasPixelRatio);
            ctx.translate(-75, -80);
            ctx.beginPath();
            ctx.moveTo(75, 40);
            ctx.rect(10, 10, 250, 200);
            ctx.clip();
            ctx.translate(75, 80);
            ctx.scale(1 / 3 / canvasPixelRatio, 1 / 3 / canvasPixelRatio);
          
            // reapply canvas rotation and position
            ctx.rotate(canvasRotation);
            ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
          });
          
          nk.on('postrender', function (event) {
            const ctx = event.context;
            ctx.restore();
          });
        
        // export as png
        // document.getElementById('export-png').addEventListener('click', function () {
        //     map.once('rendercomplete', function () {
        //       const mapCanvas = document.createElement('canvas');
        //       const size = map.getSize();
        //       mapCanvas.width = size[0];
        //       mapCanvas.height = size[1];
        //       const mapContext = mapCanvas.getContext('2d');
        //       Array.prototype.forEach.call(
        //         document.querySelectorAll('.ol-layer canvas'),
        //         function (canvas) {
        //           if (canvas.width > 0) {
        //             const opacity = canvas.parentNode.style.opacity;
        //             mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
        //             const transform = canvas.style.transform;
        //             // Get the transform parameters from the style's transform matrix
        //             const matrix = transform
        //               .match(/^matrix\(([^\(]*)\)$/)[1]
        //               .split(',')
        //               .map(Number);
        //             // Apply the transform to the export map context
        //             CanvasRenderingContext2D.prototype.setTransform.apply(
        //               mapContext,
        //               matrix
        //             );
        //             mapContext.drawImage(canvas, 0, 0);
        //           }
        //         }
        //       );
        //       if (navigator.msSaveBlob) {
        //         // link download attribute does not work on MS browsers
        //         navigator.msSaveOrOpenBlob(mapCanvas.msToBlob(), 'map.png');
        //       } else {
        //         const link = document.getElementById('image-download');
        //         link.href = mapCanvas.toDataURL();
        //         link.click();
        //       }
        //     });
        //     map.renderSync();
        //   });
          
    </script>
</body>

</html>
`

export default htmlScript