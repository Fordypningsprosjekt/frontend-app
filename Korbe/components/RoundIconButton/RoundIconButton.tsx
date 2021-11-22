import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';

interface IRoundIconButtonProps{
    iconName: string;
    buttonText: string;
    screen: string;
}

export default function RoundIconButton(props: IRoundIconButtonProps){
    const {iconName, buttonText, screen} = props;
    const navigation = useNavigation(); 

    return(
        <View style={{alignItems:'center'}}>
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
                 <IconButton icon={iconName} onPress={()=>navigation.navigate(screen)}/>
             </TouchableOpacity>
             <Text style={{textAlign:'center'}}>{buttonText}</Text>
             </View>
    )
}
