import React, { useRef } from 'react';
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

interface IMapProps{
  

}

type cropData = {
  offset: { x: number, y: number },
  size: { width: number, height: number },
  displaySize: { width: number, height: number },
  resizeMode: 'contain/cover/stretch'
}


export default function Map() {

  return (
      <>
      <StatusBar barStyle="dark-content" />
          <WebView source={{html: htmlScript }} />
          
          
      </>
  );
  
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '50%',
    
  }
});

