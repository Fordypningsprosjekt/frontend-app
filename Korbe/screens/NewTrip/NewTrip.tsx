import { NavigationRouteContext } from '@react-navigation/core';
import React, { useState } from 'react';
import {Text, View, useColorScheme, StyleSheet  } from 'react-native';
import { Button, Headline, TextInput } from 'react-native-paper';
import DatePickerComponent from '../../components/DatePicker';

export default function NewTrip({navigation}){
    const [shepherd, setShepherd] = useState<string>('');

    const onButtonChange=()=>{
        navigation.navigate('Velg kart');
    }

    const isEmpty=() => {
        return shepherd==='';
    }

    return(
        <View style={styles.container}>
            <Headline style={styles.headline}>
                Registrer ny tur
                </Headline>
                <View style={styles.inputField}>
                <TextInput mode='outlined' label='Legg til navn på gjeter' placeholder='Navn' value={shepherd} onChangeText={shepherd => setShepherd(shepherd)} style={styles.inputSpace}/>
                <DatePickerComponent/>
                <Button
                mode='contained'
                onPress={onButtonChange}
                disabled={isEmpty()}
                style={styles.buttonStyle}
                >
                    Start tur
                </Button>
                </View></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20
    },
    headline:{
        marginBottom:'10%'
    },
    inputField: {
        width:'100%',
    },
    inputSpace: {
        marginBottom: '10%'
    },
    buttonStyle: {
        marginTop: '40%'
    }
})