import React, { useState } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Headline, Title } from 'react-native-paper';
import AnimalProgressBar from '../../components/AnimalProgressBar/AnimalProgressBar';
import RoundIconButton from '../../components/RoundIconButton/RoundIconButton';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(){
    const navigation = useNavigation(); 
    
    const signOut = () => {
        auth()
        .signOut()
        .then(() => {
        console.log('User signed out!');
        navigation.navigate('Startside');
    });
    }
    return( 
    <View>
        <Headline style={styles.headline}>
            Velkommen!
        </Headline>
        <View style={styles.container}>
        <View style={styles.section}>
        <RoundIconButton iconName='walk' buttonText='Ny oppsynstur' onPress={() => navigation.navigate('Ny oppsynstur')}/></View>
        <View style={styles.section}>
        <RoundIconButton iconName='folder-open' buttonText='Lagrede turer' onPress={() => navigation.navigate('Hjem')}/></View>
        <View style={styles.section}>
        <RoundIconButton iconName='map' buttonText='Last ned kart' onPress={() => navigation.navigate('Last ned kart')}/>
            </View></View>
            <View style={styles.progressBarContainer}>
                <Title style={styles.progressBarTitle}>Siste tilsynstur</Title>
                <Text style={styles.progressBarText1}>Total distanse: 3km</Text>
                <Text style={styles.progressBarText2}>Totalt antall dyr registrert: 1000</Text>
                <View style={styles.progressBarItems}>
                <AnimalProgressBar progress={0.4} label='Voksne'/>
                <AnimalProgressBar progress={0.2} label='Lam' />
                <AnimalProgressBar progress={0.05} label='Skadde sauer'/>
                <AnimalProgressBar progress={0.1} label='Døde sauer'/>
                <AnimalProgressBar progress={0.25} label='Rovdyr'/>
                </View>
            </View>
            <View style={styles.buttonContainer}>
            <RoundIconButton iconName='logout-variant' buttonText='Logg ut' onPress={signOut} />
            </View>
    </View>)
   
}
const styles = StyleSheet.create({
    headline: {
        textAlign:'center', 
        padding:20
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    section: {
        flex:1
    },
    progressBarContainer: {
        flexDirection: "column",
        flexWrap: "nowrap", 
        alignSelf:'center'
    },
    progressBarTitle: {
        textAlign:'center', 
        paddingTop:30
    },
    progressBarText1: {
        textAlign:'center',
        paddingTop:20
    },
    progressBarText2: {
        textAlign: 'center',
        padding: 20
    },
    progressBarItems: {
        flex:0.5, 
        justifyContent:'space-between'
    },
    buttonContainer: {
        alignSelf:'center'
    }
})