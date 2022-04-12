import React, { useState, useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Button, IconButton, Modal, Portal, Provider, TextInput } from "react-native-paper";
import WebView from "react-native-webview";
// import mapDisplay from "../mapDisplay";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { IMaps } from '../interfaces/interfaces'
import DisplayMap from "../components/DisplayMap";

export default function ScreenMap(){

    const [data, setData] = useState();
    const [modal1Visible, setVisibleModal1] = useState(false);
    const [modal2Visible, setVisibleModal2] = useState(false);
    const [text, setText] = useState<string>("");

    const navigation = useNavigation();
    const fieldPath = new firestore.FieldPath('data');
    
    const showModal1 = () => setVisibleModal1(true);
    const hideModal1 = () => setVisibleModal1(false);
    const showModal2 = () => setVisibleModal2(true);
    const hideModal2 = () => setVisibleModal2(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};
    let docId : string;
    
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
                    docId = documentSnapshot.id;
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
   
    const onPress = () => {
        firestore()
        .collection('maps')
        .doc(docId)
        .update({
            areaName: text
        });
        hideModal1();
        showModal2();
        
    }

    return(
        <Provider>
            <Portal>
                <Modal visible={modal1Visible} contentContainerStyle={containerStyle}>
                    <View style={styles.container}>
                   <View style={styles.section}>
                    <TextInput 
                    label="Gi navn til området" 
                    value={text} 
                    onChangeText={text => setText(text)} />
                   </View>
                   <View style={styles.section}>
                       <Button 
                       style={styles.fieldButtonStyle}
                       mode="contained"
                       onPress={onPress}>
                           Sett navn
                       </Button>
                   </View></View>
                   </Modal>
            </Portal>
           <Portal>
               <Modal
               visible={modal2Visible} contentContainerStyle={containerStyle}>
                   <View style={styles.container}>
                       <View style={styles.section}>
                       <Text style={styles.textStyle}>
                        Lastet ned!
                        </Text>
                        <View style={styles.section}>
                        <IconButton 
                        icon='checkbox-marked-circle-outline' 
                        color="#006400" 
                        size={40} 
                        style={styles.iconStyle}/>
                        </View>
                       </View>
                   </View>
                   <Button 
                       style={styles.modalButtonStyle} 
                       onPress={()=>navigation.navigate('Hjem')}
                       >Tilbake til hjemskjerm
                       </Button>
               </Modal>
               </Portal>         
                        
          <DisplayMap data={data}/>
          <Button style={styles.buttonStyle} mode='contained' onPress={showModal1}>Last ned!</Button>
          
      </Provider>
    )
}
{/* <View style={styles.section}>
                    <Text style={styles.textStyle}>
                        Lastet ned!
                        </Text>
                        </View>
                        <View style={styles.section}>
                        <IconButton icon='checkbox-marked-circle-outline' color="#006400" size={30} style={styles.iconStyle}/>
                   </View>  */}
{/* <Button style={styles.modalButtonStyle} onPress={()=>navigation.navigate('Hjem')}>Tilbake til hjemskjerm</Button> */}

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
        flex:3,
    },
    iconStyle: {
        alignSelf:'flex-end'
    },
    fieldButtonStyle: {
        alignSelf: "center"
    }
  });