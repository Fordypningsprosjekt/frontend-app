import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput, HelperText } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';

const items = [{id:1, name: 'hei'}, {id:2, name: 'hei2'}, {id:3, name: 'hei3'}]

export default function CreateAccount({navigation}) {
    //TODO: Finne en bedre måte å sette disse verdiene på
    //importere passordvalidering
    //Hvis tid, få til å koble til API-et til kart og få select med kommuner
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [farmNumber, setFarmNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const nameError =()=>{
        return /\d/.test(name);
    }

    const emailError = () => {
        return !email.includes('@') && email!='';
    }

    const passwordError = () => {
        return password!='' && password2!='' && password!=password2;
    }

    const hasNotFilledOut = () => {
        return name==='' || email ==='' || city==='' || farmNumber==='' || password==='' || password2==='';
    }

    return (
        <View>
            <TextInput
                mode="outlined"
                label="Navn"
                value={name}
                onChangeText={(name:string) => setName(name)}
            />
            <HelperText type='error' visible={nameError()}>Dette er ikke et gyldig navn!</HelperText>
            <TextInput
                mode="outlined"
                label="E-post"
                value={email}
                onChangeText={(email:string) => setEmail(email)}
            />
            <HelperText type="error" visible={emailError()}>E-postadressen er ikke gyldig!</HelperText>
            <TextInput
                mode="outlined"
                label="Kommune"
                value={city}
                onChangeText={(city: string) => setCity(city)}
            />
            <TextInput 
            mode='outlined'
            label='Gårdsnummer'
            value={farmNumber}
            onChangeText={(farmNumber:string)=>setFarmNumber(farmNumber)}/>
            <TextInput 
            mode='outlined'
            label='Passord'
            value={password}
            onChangeText={(password:string)=>setPassword(password)}/>
            <TextInput 
            mode='outlined'
            label='Gjenta passord'
            value={password2}
            onChangeText={(password2:string)=>setPassword2(password2)}/>
            <HelperText 
                type="error" visible={passwordError()}>Passordene er ikke like!
                </HelperText>
            <Button mode='contained' disabled={hasNotFilledOut()} onPress={()=> navigation.navigate('Innlogging')}>
                Opprett bruker</Button>
        </View>
    );
}
