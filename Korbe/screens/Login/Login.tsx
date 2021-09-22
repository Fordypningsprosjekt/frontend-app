import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface ILogin {
    email: string;
    password: string;
}

export default function Login() {
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    return (
        <View>
            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(email: String) => setEmail(email)}
                style={{ marginTop: '10%', marginBottom: '10%' }}
            />
            <TextInput
                mode="outlined"
                label="Passord"
                value={password}
                onChangeText={(password: String) => setPassword(password)}
                style={{ marginBottom: '10%' }}
            />
            <Button
                mode="contained"
                onPress={() => console.log('Pressed')}
                style={{ alignSelf: 'center', marginTop: '10%', width: '30%' }}
            >
                Logg inn
            </Button>
        </View>
    );
}
