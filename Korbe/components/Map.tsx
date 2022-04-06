import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
} from 'react-native';

import {
  WebView
} from 'react-native-webview'
import { getFetch } from '../utils/fetch';
import htmlScript from '../htmlScript';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
interface IMapProps{
  

}

type cropData = {
  offset: { x: number, y: number },
  size: { width: number, height: number },
  displaySize: { width: number, height: number },
  resizeMode: 'contain/cover/stretch'
}


export default function Map() {
  const navigation = useNavigation();
  const [data, setData] = useState();
  const date = new Date();

  const onMessage = (data: any) => {
    setData(data);
    console.log(data);
  }

  const onButtonChange = () => {
    const uid = auth().currentUser?.uid;
    firestore().collection('maps').add({
      uid,
      data,
      date
    })
    navigation.navigate('Nedlastet kart');
  }

  return (
      <>
      <StatusBar barStyle="dark-content" />
          <WebView 
          source={{html: htmlScript }} 
          onMessage={(event) => onMessage(event.nativeEvent.data)}/>
          <Button 
          mode='contained'
          onPress={onButtonChange}
          style={styles.buttonStyle}>Beskjær kart!</Button>
      </>
  );
  
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '50%',
    alignSelf: 'center'
    
  }
});

