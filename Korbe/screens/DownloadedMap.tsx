import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import DisplayMap from "../components/DisplayMap";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';

export default function DownloadedMap(){
    const navigation = useNavigation();
    const fieldPath = new firestore.FieldPath('data');
    const [addedItems, setAddedItem] = useState<string[]>([]);
    
    useEffect(() => {getMapData();}, [])
    
    const getMapData = () => {
        const mapData =
        firestore()
        .collection('maps')
        .where('uid', '==',auth().currentUser?.uid)
        .orderBy('date', 'desc')
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
        
        mapData.then((a) => {a? setAddedItem(a): console.log('Object undefined'); })
    };   
    console.log('data: ' + addedItems);
    getMapData();

    return(
        <>
        {addedItems?.map((addedItem: string|undefined) => (
            <DisplayMap data={addedItem} />
        ))}
        </>
    )
}