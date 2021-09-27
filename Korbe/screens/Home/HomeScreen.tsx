import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button, Headline, IconButton } from 'react-native-paper';

export default function HomeScreen(){
    //TODO: Endre på stylingen
    return( 
    <View>
        <Headline style={{textAlign:'center'}}>
            Velkommen!
        </Headline>
        <View style={{flexDirection: "row",
    flexWrap: "wrap"}}>
        <View style={{flex:1}}>
        <TouchableOpacity style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       height:70,
       backgroundColor:'#fff',
       borderRadius:50,
     }}>
            <IconButton icon='walk'/>
        </TouchableOpacity>
        <Text>Ny oppsynstur</Text></View>
        <View style={{flex:1}}>
        <TouchableOpacity style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       height:70,
       backgroundColor:'#fff',
       borderRadius:50,
     }}>
            <IconButton icon='folder-open'/>
        </TouchableOpacity><Text>Lagrede turer</Text></View>
        <View style={{flex:1}}>
        <TouchableOpacity style={{
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       height:70,
       backgroundColor:'#fff',
       borderRadius:50,
     }}>
            <IconButton icon='map'/>
        </TouchableOpacity><Text>Last ned kart</Text>
            </View></View>
    </View>)
   
}