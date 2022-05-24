import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Headline } from 'react-native-paper';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Login from '../Login/Login';
import { useNavigation } from '@react-navigation/core';
//TODO: Fikse typen til navigation sånn at det ikke er any
export default function StartPage() {
    const navigation = useNavigation();

    return (
        <View style={{ marginTop: '50%' }}>
            <Headline style={{ textAlign: 'center' }}>Bæædar</Headline>
            <Image
                source={require('../../images/sheep-icon-png-27.jpg')}
                style={{
                    width: '30%',
                    height: '30%',
                    alignSelf: 'center',
                    marginTop: '10%'
                }}
            />
            <Button
                mode="contained"
                onPress={() => navigation.navigate('Innlogging')}
                style={{
                    marginBottom: '10%',
                    marginTop: '10%',
                    width: '50%',
                    alignSelf: 'center'
                }}
            >
                Logg inn
            </Button>

            <Button
                mode="contained"
                onPress={() => navigation.navigate('Opprett bruker')}
                style={{ width: '50%', alignSelf: 'center' }}
            >
                Opprett bruker
            </Button>
        </View>
    );
}
