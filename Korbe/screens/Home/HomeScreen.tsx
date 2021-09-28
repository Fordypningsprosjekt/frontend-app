import React, { useState } from 'react';
import {Text, View } from 'react-native';
import { Button, Headline,  ProgressBar, Title } from 'react-native-paper';
import AnimalProgressBar from '../../components/AnimalProgressBar/AnimalProgressBar';
import RoundIconButton from '../../components/RoundIconButton/RoundIconButton';

export default function HomeScreen(){
    //TODO: Fikse stylingen
    return( 
    <View>
        <Headline style={{textAlign:'center', padding:20}}>
            Velkommen!
        </Headline>
        <View style={{flexDirection: "row",
    flexWrap: "wrap", marginLeft:30}}>
        <View style={{flex:1}}>
        <RoundIconButton iconName='walk' buttonText='Ny oppsynstur'/></View>
        <View style={{flex:1}}>
        <RoundIconButton iconName='folder-open' buttonText='Lagrede turer'/></View>
        <View style={{flex:1}}>
        <RoundIconButton iconName='map' buttonText='Last ned kart'/>
            </View></View>
            <View style={{flexDirection: "column",
    flexWrap: "nowrap", alignSelf:'center'}}>
                <Title style={{textAlign:'center', paddingTop:30}}>Siste tilsynstur</Title>
                <Text style={{textAlign:'center', paddingTop:20}}>Total distanse: 3km</Text>
                <Text style={{textAlign:'center', padding:20}}>Totalt antall dyr registrert: 1000</Text>
                <View style={{flex:0.5, justifyContent:'space-between'}}>
                <AnimalProgressBar progress={0.4} label='Voksne'/>
                <AnimalProgressBar progress={0.2} label='Lam' />
                <AnimalProgressBar progress={0.05} label='Skadde sauer'/>
                <AnimalProgressBar progress={0.1} label='Døde sauer'/>
                <AnimalProgressBar progress={0.25} label='Rovdyr'/>
                </View>
            </View>
            <View style={{alignSelf:'center'}}>
            <RoundIconButton iconName='logout-variant' buttonText='Logg ut'/>
            </View>
    </View>)
   
}