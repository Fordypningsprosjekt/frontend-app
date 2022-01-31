import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { Button, Modal } from "react-native-paper";
import ViewShot, { captureRef, captureScreen } from "react-native-view-shot";
import Map from "../components/Map";


export default function DownloadMap(){
    const [imageURI, setImageURI] = useState('');
    const navigation = useNavigation()

    const captureScreenShot = () => {
        captureScreen({
          format: "png",
        }).then(
          uri => setImageURI(uri),
          error => console.error("Ops, snapshot failed", error)
        )
      }
    const handleButton = () => {
        navigation.navigate('Nedlastet kart')
    }
    
    //   let path = `${RNFetchBlob.fs.dirs.DocumentDir}/5.klasse/Fordypningsprosjekt/frontend-app/Korbe/images/test.png`;
    //   console.log(RNFetchBlob.fs.dirs.DocumentDir)

    //   captureScreen({
    //     format: "png",
    //   }).then( data => {
    //       RNFetchBlob.fs.writeFile(path, data, 'base64').then(()=>{
    //           (error: String) => console.error("Oops, snapshot failed", error)
    //       }
    //       );
    //   })
    return(
        <>
    <Map />
    <ViewShot>
    <View>
            {/* <Button mode="outlined" onPress={captureScreenShot}>Ta bilde</Button>
            <Button mode='outlined' onPress={handleButton}>Se kart</Button> */}
          </View>
    </ViewShot>
    </>
    )

}