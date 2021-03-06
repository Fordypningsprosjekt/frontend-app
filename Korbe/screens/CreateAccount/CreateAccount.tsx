import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Headline, TextInput, HelperText } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export default function CreateAccount() {
    //TODO: Finne en bedre måte å sette disse verdiene på
    //importere passordvalidering
    //Hvis tid, få til å koble til API-et til kart og få select med kommuner
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [farmNumber, setFarmNumber] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');
    const navigation = useNavigation();

    const nameError = (name:string) => {
        return /\d/.test(name);
    }

    const emailError = () => {
        return !email.includes('@') && email!='';
    }

    const passwordError = () => {
        return password!='' && password2!='' && password!=password2;
    }

    const hasNotFilledOut = () => {
        return firstName==='' || lastName==='' || email ==='' || city==='' || farmNumber==='' || password==='' || password2==='';
    }

    const checkUser = () => {
        const uid = auth().currentUser?.uid;
        auth()
        .createUserWithEmailAndPassword(email,password)
        .then(()=> {
            console.log('User account created & signed in');
            navigation.navigate('Hjem');
            firestore().collection('users').doc(uid).set({
                firstName,
                lastName,
                email,
                city,
                farmNumber,
            });
        })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            }
            if(error.code === 'auth/invalid-email'){
                emailError();
                console.log('That email is invalid!');
            }
            console.error(error);
        })
    }
    

    return (
        <View>
            <TextInput
                mode="outlined"
                label="Fornavn"
                value={firstName}
                onChangeText={(firstName:string) => setFirstName(firstName)}
            />
            <HelperText type='error' visible={nameError(firstName)}>Dette er ikke et gyldig navn!</HelperText>
            <TextInput
                mode="outlined"
                label="Etternavn"
                value={lastName}
                onChangeText={(lastName:string) => setLastName(lastName)}
            />
            <HelperText type='error' visible={nameError(lastName)}>Dette er ikke et gyldig navn!</HelperText>
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
            <Button mode='contained' disabled={hasNotFilledOut()} onPress={checkUser}>
                Opprett bruker</Button>
        </View>
    );
}
