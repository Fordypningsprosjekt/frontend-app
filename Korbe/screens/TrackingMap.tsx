import { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import React from "react";
import DisplayMap from "../components/DisplayMap";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet } from "react-native";

export default function TrackingMap(){
    const navigation = useNavigation();
    const fieldPath = new firestore.FieldPath('data');
    const [data, setData] = useState();
    
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
                    jsonString = documentSnapshot.get(fieldPath);
                    console.log('data:', jsonString)
                }
            })
            return jsonString;
            }
            
        )
        .catch(e => console.error(e));
        
        mapData.then((a) => {a? setData(a): console.log('Object undefined'); })
    };   
    console.log('data: ' + data);
    getMapData();

    return(
        <>
        <DisplayMap data={data} /> 
        <Button 
        mode="contained"
        onPress={()=>navigation.navigate('Velg avstand')}
        style={styles.buttonStyle}>
            Registrer
            </Button>
        </>
    )

}

const styles = StyleSheet.create({
    buttonStyle: {
        width: '60%',
        alignSelf:'center'
    },
})