import React, { useState } from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {  Title } from 'react-native-paper';
import AnimalProgressBar from '../components/AnimalProgressBar/AnimalProgressBar';
import RoundIconButton from '../components/RoundIconButton/RoundIconButton';

export default function HomeTripScreen(){
    
    return( 
    <View>
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