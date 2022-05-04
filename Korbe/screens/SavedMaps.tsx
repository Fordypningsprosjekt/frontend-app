import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Headline, IconButton } from "react-native-paper";
import DisplayMap from "../components/DisplayMap";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';

export default function SavedMaps(props: SavedMapsProps){
    const navigation = useNavigation();
    const [mapTitle, setMapTitle] = useState('');
    const nameFieldPath = new firestore.FieldPath('areaName')

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
            let  areaName;
            querySnapshot.forEach(documentSnapshot => {
                if(documentSnapshot.exists){
                    areaName = documentSnapshot.get(nameFieldPath);
                    console.log('areaName', areaName);
                }
            })
            return areaName;
            }
            
        )
        .catch(e => console.error(e));
        
        mapData.then((a) => {a? setMapTitle(a): console.log('Object undefined'); })
    };   
    console.log('mapName: ' + mapTitle);
    getMapData();
    return(
        <View>
            <Headline style={styles.headlineStyle}>Velg kartet du skal bruke</Headline>
            <View style={styles.container}>
                <View style={styles.section}>
                <Card.Title 
                title={mapTitle}
                right={()=><IconButton icon='arrow-right-thick' onPress={() => navigation.navigate("Bruk kartet")} />}
                style={styles.cardStyle}
                />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headlineStyle: {
        textAlign:'center', 
        padding:20
    },
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
    },
    cardStyle:{
        backgroundColor: 'blue',
        width: '80%',
        
    },
    section: {
        flex: 1
    }
})