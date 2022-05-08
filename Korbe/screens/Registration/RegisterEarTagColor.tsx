import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Headline, IconButton, TextInput, Title } from "react-native-paper";

export default function RegisterEarTagColor(){
    const [addedColors, setAddedColors] = useState<string[]>([]);

    return(
        <View>
            <Headline style={styles.headline}>
                Registrer
            </Headline>
            <Title style={styles.title}>
                Farge på øremerker
                </Title>
        <TextInput
        mode="outlined"
        >
            hei
        </TextInput>
        <IconButton 
        icon="plus-circle"
        size={50}
        />
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
    section: {
        flex:3,     
    },
    text: {
        fontSize: 70
    },
})
