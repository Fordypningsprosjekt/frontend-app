import React, { useState, useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";


//TODO: Lage dette til en mer gjenbrukbar komponent etterhvert
//Trenger en liste med maps -> deretter iterere igjennom og lage cards med hvert map
//hvordan skal det fikses?
//skal cards være en egen komponent med kart ogsånt?
//kanskje forandre på koden til å hente flere kart fra firestore, ikke bare ett
//{data} i html er ganske generell, så det kan jo i teorien fungere å gjøre dette her til en generell komponent
//framgangsmåte:
    //maps er en kolleksjon med masse kart tilknyttet forskjellige brukere
    //først filtrere på brukerid
    //legge til alle i en liste
    //htmlscriptet burde kanskje være i en egen komponent? definere data helt i starten elns også iterere igjennom lista
    //hmmm hvordan skal dette gjøres da????
    //lage tre forskjellige screens?
    //men hvordan skal jeg sende data fra en fil til en annen?

interface DisplayMapProps{
    data: string|undefined;
}

export default function DisplayMap(props:DisplayMapProps){
    const {data} = props;
    
    const mapDisplay =
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
        </form>
        <div>
        </div>
        <script id="mapDisplay" type="text/javascript">

            // Style
            const styles = {
                'Polygon': new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#BF0404',
                        width: 2,
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    })
                })
            }

            const styleFunction = function(feature){
                return styles[feature.getGeometry().getType()];
            }

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

            var geoJSON = new ol.source.Vector({
                features: new ol.format.GeoJSON().readFeatures(${data}, {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'}),
            });
            geoJSON.addFeature(new ol.Feature(new ol.geom.Circle([5e6, 7e6], 1e6)));

            var vector = new ol.layer.Vector({
                    source: geoJSON,
                    style: styleFunction,
                });

            var map = new ol.Map({
                target: 'map',
                layers: [osm, nk, vector],
                view: new ol.View({
                    center: ol.proj.transform([13.41, 65.42], 'EPSG:4326', 'EPSG:3857'),
                    zoom: 11,
                }),
            });
            nk.getView().fit(geoJSON.getExtent(), nk.getSize());
            nk.getView().setCenter(ol.proj.transform([13.41, 65.42], 'EPSG:4326', 'EPSG:3857'))

        </script>
        
    </body>

    </html>
    `;

    // console.log('mapDisplay: ' + mapDisplay);

    return(
            <>
      <StatusBar barStyle="dark-content" />
          <WebView 
          source={{html: mapDisplay }}
         
          onMessage={(event) => {}}
          />
         </> 
    )
}
