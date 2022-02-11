import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Button, Modal } from "react-native-paper";
import WebView from "react-native-webview";
import mapDisplay from "../mapDisplay";
import firestore from '@react-native-firebase/firestore';


export default function screenMap(){

    const date = new Date();
    
    const fetchData = () => {
        firestore()
        .collection('maps')
        .where('date', '<=', date)
        .limit(1)
        .get()
        .then(querySnapShot => {
            querySnapShot.forEach(documentSnapShot => {
                console.log("json string:", documentSnapShot.data())
            })
        })

    }
   
    return(
        <>
      <StatusBar barStyle="dark-content" />
          <WebView 
          source={{html: mapDisplay }}
          postMessage
          />
          
      </>
    )
}

const styles = StyleSheet.create({
    imageWrapper:{
        padding: 10,
        backgroundColor: 'white',
    },
    imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    }
    
})