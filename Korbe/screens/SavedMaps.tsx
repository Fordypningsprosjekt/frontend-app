import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Headline, IconButton } from "react-native-paper";


//TODO: Sette opp firebase sånn at den henter nedlastede kart fra databasen
export default function SavedMaps(){
    const navigation = useNavigation();
    const onPress = ()=> {
        navigation.navigate('Aktiv oppsynstur');
    }
    
    return(
        <View>
            <Headline style={styles.headlineStyle}>Velg kartet du skal bruke</Headline>
            <View style={styles.container}>
                <Card.Title 
                title='Hei'
                right={()=><IconButton icon='arrow-right-thick' onPress={onPress} />}
                style={styles.cardStyle}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    headlineStyle: {
        textAlign:'center', 
        padding:20
    },
    container: {
        flexDirection: "column",
        flexWrap: "wrap",
    },
    cardStyle:{
        flex: 1,
        backgroundColor: 'blue',
        width: '80%',
        
    }
})