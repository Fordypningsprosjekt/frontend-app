import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

interface ILogin {
    email: string;
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    //TODO: funksjon for å hente inn data senere og sjekker om brukeren finnes i databasen
    

    const navigation = useNavigation();

    const isEmpty=() => {
        return email==='' || password==='';
    }

    const onButtonChange = () =>{
        auth().
        signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account signed in!');
            navigation.navigate('Hjem');
            setEmail('');
            setPassword('');
        })
        .catch(error => {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password'){
                console.log('Inavlid email or password');
            }
            if (error.code === 'auth/user-not-found' || error.code === 'auth/user-disabled'){
                console.log('User not found');
            }
            console.error(error);
        })
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
