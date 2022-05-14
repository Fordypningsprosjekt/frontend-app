import React, { useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Button, Headline, IconButton, Title } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";

export default function RegisterSheep(){
    const [count, setCount] = useState<number>(0);
    const navigation = useNavigation();
    const onIncreasePress = () => {
        setCount(count+1);
    }

    const onDecreasePress = () => {
        count>0? setCount(count-1): setCount(0);
    }

    const onSavePress = () => {

        const tripId = 
        firestore()
        .collection('trips')
        .where('uid', '==', auth().currentUser?.uid)
        .orderBy('date', 'desc')
        .limit(1)
        .get()

        navigation.navigate('Antall lam');
    }
    
    return(
        <View>
            <Headline style={styles.headline}>
                Registrer
            </Headline>
            <Title style={styles.title}>Antall voksne og lam</Title>
            <Image 
            source={require('../../images/sheep-lambs.png')}
            style={styles.image}
            />
            <View style={styles.container}>
            <View style={styles.section}>
                <IconButton 
                    icon='minus'
                    size={50}
                    onPress={onDecreasePress}/>
                </View>
                <Text style={styles.text}>
                   {count} 
                </Text>
                <View style={styles.section}>
                    <IconButton 
                    icon='plus-thick'
                    size={50}
                    onPress={onIncreasePress}
                    style={styles.iconPlusButton}
                    />
                </View>
            </View>
            <Button 
            mode="contained"
            onPress={onSavePress}
            style={styles.buttonStyle}>
                Lagre
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    headline: {
        textAlign:'center', 
        padding:20
    },
    title: {
        textAlign:'center', 
        paddingTop:30
    },
    container: {
        marginTop: '5%',
        flexDirection: "row",
        flexWrap: "wrap",
    },
    image:{
        width: '50%',
        height: '20%',
        alignSelf: 'center',
        marginTop: '10%',
    },
    section: {
        flex:3,     
    },
    iconPlusButton: {
        alignSelf:'flex-end'
    },
    text: {
        fontSize: 70
    },
    buttonStyle: {
        width: '60%',
        alignSelf:'center'
    },
})