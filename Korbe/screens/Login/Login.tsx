import React, { useState } from 'react';
import {View} from 'react-native';
import { Button, TextInput } from 'react-native-paper';

interface ILogin {
    email: string;
    password: string;
}

export default function Login(navigation){
    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    return(
        <View>
            <TextInput mode='flat' label='Email' value={email} onChangeText={email=>setEmail(email)} style={{marginTop: '10%', marginBottom:'10%'}}/>
            <TextInput mode='flat' label='Password' value={password} onChangeText={password=>setPassword(password)} style={{marginBottom:'10%'}} />
            <Button mode='contained' onPress={() => console.log('Pressed')} style={{alignItem: 'center'}}/>
        </View>
    )
}