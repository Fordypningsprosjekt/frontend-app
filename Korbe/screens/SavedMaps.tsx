import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Headline, IconButton } from "react-native-paper";
import DisplayMap from "../components/DisplayMap";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
interface SavedMapsProps{
    mapTitle: string,
    navigationMap: string
}

export default function SavedMaps(props: SavedMapsProps){
    const {mapTitle, navigationMap} = props;
    const navigation = useNavigation();
    const fieldPath = new firestore.FieldPath('data');
    const [addedItems, setAddedItems] = useState<string[]>([]);
    
    useEffect(() => {getMapData();}, [])
    
    const getMapData = () => {
        const mapData =
        firestore()
        .collection('maps')
        .where('uid', '==',auth().currentUser?.uid)
        .orderBy('date', 'desc')
        .get()
        .then( querySnapshot => {
            let geoList=[''];
            querySnapshot.forEach(documentSnapshot => {
                if(documentSnapshot.exists){
                    geoList.push(documentSnapshot.get(fieldPath));
                    // console.log('data:', jsonString)
    
                }
                
            })
            // console.log('data:'+jsonStrings);
            return geoList;
            }
            
        )
        .catch(e => console.error(e));
        
        mapData.then(((a) => {a? setAddedItems(a): console.log('Object undefined'); }))
    };
    console.log('data: ' + addedItems);
    // getMapData();

    const onPress = ()=> {
        navigation.navigate(navigationMap);
    }
    
    addedItems.length;
    return(
        <View>
            <Headline style={styles.headlineStyle}>Velg kartet du skal bruke</Headline>
            <View style={styles.container}>
            {addedItems?.map((addedItem: string, key: number) => (
                <View style={styles.section}>
                <Card.Title 
                title={addedItem} 
                right={()=><IconButton icon='arrow-right-thick' onPress={onPress} />}
                style={styles.cardStyle}
                key = {key}
                />
                </View>
                ))}
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