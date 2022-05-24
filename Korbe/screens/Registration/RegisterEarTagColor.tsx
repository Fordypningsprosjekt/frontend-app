import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline, IconButton, TextInput, Title } from "react-native-paper";


export default function RegisterEarTagColor(){
    const [addedColors, setAddedColors] = useState<string[]>([]);
    const [text1, setText1] = useState<string>('');
    const [text2, setText2] = useState<string>('');
    const [text3, setText3] = useState<string>('');
    const [text4, setText4] = useState<string>('');
    const [text5, setText5] = useState<string>('');
    const navigation = useNavigation();
    const [showInputField, setInputField] = useState(false);

    const onPress = () => {
        setInputField(true);
    }

    const onSavePress = () => {
        navigation.navigate('Antall skadde sauer');
    }

    return(
        <View style={styles.container}>
            <Headline style={styles.headline}>
                Registrer
            </Headline>
            <Title style={styles.title}>
                Farge på øremerker
                </Title>
            <View style={styles.inputField}>
            <TextInput
                mode="outlined"
                onChangeText={(text1: string)=>setText1(text1)}
                label='Legg til farge'
                placeholder="Farge"
                value={text1}
                style={styles.inputSpace}
                />
            <TextInput
                mode="outlined"
                onChangeText={(text2: string)=>setText2(text2)}
                label='Legg til farge'
                placeholder="Farge"
                value={text2}
                style={styles.inputSpace}
                />
            <TextInput
                mode="outlined"
                onChangeText={(text3: string)=>setText3(text3)}
                label='Legg til farge'
                placeholder="Farge"
                value={text3}
                style={styles.inputSpace}
                />
            <TextInput
                mode="outlined"
                onChangeText={(text4: string)=>setText4(text4)}
                label='Legg til farge'
                placeholder="Farge"
                value={text4}
                style={styles.inputSpace}
                />
            {showInputField && 
            <TextInput
            mode="outlined"
            onChangeText={(text5: string)=>setText5(text5)}
            label='Legg til farge'
            placeholder="Farge"
            value={text5}
            style={styles.inputSpace}
            />
            }
            </View>
           
            <IconButton 
            icon="plus-circle"
            size={50}
            onPress={onPress}
            style={styles.iconButton}
            color="navy"
            />
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
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20
    },
    section: {
        flex:3,     
    },
    text: {
        fontSize: 70
    },
    buttonStyle: {
        width: '60%',
        alignSelf:'center'
    },
    iconButton: {
        alignSelf: 'center'
    },
    inputField: {
        width:'100%',
    },
    inputSpace: {
        marginBottom: '5%'
    },
})
