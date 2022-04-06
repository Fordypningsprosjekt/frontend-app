import React, { useState, useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Button, IconButton, Modal, Portal, Provider } from "react-native-paper";
import WebView from "react-native-webview";
// import mapDisplay from "../mapDisplay";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";


export default function screenMap(){
    const [data, setData] = useState();
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();
    const fieldPath = new firestore.FieldPath('data');
    
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    
    useEffect(() => {getMapData();}, [])
    
    const getMapData = () => {
        const mapData =
        firestore()
        .collection('maps')
        .where('uid', '==',auth().currentUser?.uid)
        .orderBy('date', 'desc')
        .limit(1)
        .get()
        .then( querySnapshot => {
            let jsonString;
            querySnapshot.forEach(documentSnapshot => {
                if(documentSnapshot.exists){
                    // console.log('Map data: ', documentSnapshot.get(fieldPath));
                    // console.log('Type: ', JSON.parse(documentSnapshot.get(fieldPath)))
                    jsonString = documentSnapshot.get(fieldPath);
                }
            })
            // setData(jsonString);
            return jsonString;
            }
            
        )
        .catch(e => console.error(e));
        
        mapData.then((a) => {a? setData(a): console.log('Object undefined'); })
    };   

    console.log('data: ' + data);
    getMapData();
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
        <Provider>
            <Portal>
                <Modal visible={visible} contentContainerStyle={containerStyle}>
                    <View style={styles.container}>
                        <View style={styles.section}>
                    <Text style={styles.textStyle}>
                        Lastet ned!
                        </Text>
                        </View>
                        <View style={styles.section}>
                        <IconButton icon='checkbox-marked-circle-outline' color="#006400" size={30} style={styles.iconStyle}/>
                   </View> 
                   </View>
                    
                        <Button style={styles.modalButtonStyle} onPress={()=>navigation.navigate('Hjem')}>Tilbake til hjemskjerm</Button>
                        </Modal>
            </Portal>
      <StatusBar barStyle="dark-content" />
          <WebView 
          source={{html: mapDisplay }}
         
          onMessage={(event) => {}}
          />
          <Button style={styles.buttonStyle} mode='contained' onPress={showModal}>Last ned!</Button>
          
      </Provider>
    )
}

const styles = StyleSheet.create({
    buttonStyle: {
      width: '50%',
      alignSelf: 'center'
      
    },
    modalButtonStyle: {
        width: '100%',
        alignSelf: 'flex-start',
    },
    textStyle: {
        alignSelf:'center',
        fontSize: 30
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    section: {
        flex:3
    },
    iconStyle: {
        alignSelf:'flex-start'
    }
  });