import React from 'react';
import {Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

interface IAnimalProgressBarProps{
    label: string;
    progress: number;
}

export default function AnimalProgressBar(props: IAnimalProgressBarProps){
    const {label, progress} = props;

    return(
        <View>
        <Text>{label}</Text>
        <ProgressBar progress={progress}/>
        <Text style={{textAlign:'right'}}>{progress*100+'%'}</Text>
        </View>
    )
}