import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DisplayMap from "../components/DisplayMap";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { Button } from "react-native-paper";

export default function DownloadedMap(){
    const navigation = useNavigation();
    const fieldPath = new firestore.FieldPath('data');
    const [data, setData] = useState();
    const [docId, setDocId] = useState('');
    let mapId: string;
    let tripId: string;

    
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
                    mapId = documentSnapshot.id;
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

    const onPress = () => {
       const tripId = 
       firestore()
        .collection('trips')
        .where('uid', '==',auth().currentUser?.uid)
        .orderBy('date', 'desc')
        .limit(1)
        .get()
        .then(querySnapshot => {
            let docId;
            querySnapshot.forEach(documentSnapshot => {
                if(documentSnapshot.exists){
                    docId = documentSnapshot.id;
                }
            })
            return docId;
            })
        .catch(e => console.error(e));
        tripId.then((a) => {a?setDocId(a):console.log('Document undefined')})

        firestore()
        .collection('trips')
        .doc(docId)
        .update({
            mapId: mapId
        });
        navigation.navigate("Aktiv oppsynstur");
        console.log('mapId', mapId)
    }
    
    return(
        <>
        <DisplayMap data={data} />
        <Button mode="contained" onPress={onPress}>Bruk kartet</Button>
        </>
    )
}