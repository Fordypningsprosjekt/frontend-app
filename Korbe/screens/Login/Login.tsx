import { NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface ILogin {
    email: string;
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    //TODO: funksjon for å hente inn data senere og sjekker om brukeren finnes i databasem
    const navigation = useNavigation();
    const isEmpty=() => {
        return email==='' || password==='';
    }

    const onButtonChange = () =>{
        navigation.navigate('Hjem');
        setEmail('');
        setPassword('');
    }

    return (
        <View>
            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(email: string) => setEmail(email)}
                style={{ marginTop: '10%', marginBottom: '10%' }}
            />
            <TextInput
                mode="outlined"
                label="Passord"
                value={password}
                onChangeText={(password: string) => setPassword(password)}
                style={{ marginBottom: '10%' }}
                secureTextEntry
                right={<TextInput.Icon name="eye" />}
            />
            <Button
                mode="contained"
                onPress={onButtonChange}
                style={{ alignSelf: 'center', marginTop: '10%', width: '30%' }}
                // disabled={isEmpty()}
            >
                Logg inn
            </Button>
        </View>
    );
}
