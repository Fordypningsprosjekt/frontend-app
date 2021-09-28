import React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface IRoundIconButtonProps{
    iconName: string;
    buttonText: string;
}

export default function RoundIconButton(props: IRoundIconButtonProps){
    const {iconName, buttonText} = props;

    return(
        <View>
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
                 <IconButton icon={iconName}/>
             </TouchableOpacity>
             <Text>{buttonText}</Text>
             </View>
    )
}
