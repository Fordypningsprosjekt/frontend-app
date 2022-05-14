import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Headline, IconButton, Title } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import auth, { firebase } from '@react-native-firebase/auth';
import ColorSelect from "../../components/ColorSelect";

export default function RegisterTieColor(){
    const [count, setCount] = useState<number>(0);
    const [countList, setCountList] = useState<number[]>([]);
    const [addedColors, setAddedColors] = useState<string[]>([]);
    const navigation = useNavigation();
    const onIncreasePress = () => {
        setCount(count+1);
    }

    const onDecreasePress = () => {
        count>0? setCount(count-1): setCount(0);
    }
  

    const onSavePress = () => {

        // const tripId = 
        // firestore()
        // .collection('trips')
        // .where('uid', '==', auth().currentUser?.uid)
        // .orderBy('date', 'desc')
        // .limit(1)
        // .get()

        if(addedColors.length<=1){
            setCountList([...countList, count]);
            setCount(0);
         }
         if(addedColors.length===2){
             setCountList([...countList, count]);
             setCount(0);
         }
         if(addedColors.length===3){
             setCountList([...countList, count]);  
         }
         if(addedColors.length>=4){
            setCountList([...countList, count]);
            navigation.navigate('Farge på øremerker');   
        }
    }
    console.log('color', addedColors);
    return(
        <View>
            <Headline style={styles.headline}>
                Registrer
            </Headline>
            <Title style={styles.title}>Velg farge på slipset</Title>
            <ColorSelect colors={addedColors} setColor={setAddedColors}/>
            <Image 
            source={require('../../images/sheep-tie.png')}
            style={styles.image}
            />
            <View style={styles.container}>
            {addedColors.map((color:string, key:number)=>{
                const count = countList[key];
                return (
                <View style={styles.colorSection}>
                    <IconButton
                    key={key}
                    icon="checkbox-blank-circle"
                    color={color}
                    size={20} 
                />
                
                <Text>
                    {count}
                    </Text>
                </View>
                
                )
            })}
             </View>
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
        height: '32%',
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
    colorSection: {
        flex:1
    },
})
