import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';

export default function CreateAccount() {
    //TODO: Finne en bedre måte å sette disse verdiene på
    const [name, setName] = useState<String>('');
    const [email, setEmail] = useState<String>('');
    const [city, setCity] = useState<String>('');
    const [farmNumber, setFarmNumber] = useState<String>('');
    return (
        <View>
            <TextInput
                mode="outlined"
                label="Name"
                value={name}
                onChangeText={(name:String) => setName(name)}
            />
            <TextInput
                mode="outlined"
                label="Email"
                value={email}
                onChangeText={(email:String) => setEmail(email)}
            />
            <TextInput
                mode="outlined"
                label="City"
                value={city}
                onChangeText={(city: String) => setCity(String)}
            />
        </View>
    );
}
