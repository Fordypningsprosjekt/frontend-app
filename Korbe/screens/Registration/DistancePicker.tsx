import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Headline } from "react-native-paper";

export default function DistancePicker(){
    const navigation =  useNavigation();
    const [distanceUnder30, setDistanceUnder30m] = useState(false);

    const onPressShortDistance = () => {
        setDistanceUnder30m(true);
        navigation.navigate('Antall sau og lam');
    }

    const onPress = () => {
        navigation.navigate('Antall sau og lam');
    }

    return(
        <View>
            <Headline style={styles.headline}>
                Velg avstand
            </Headline>
            
                <Button 
                mode="contained"
                onPress={onPressShortDistance}
                style={styles.buttonStyle}
                >Mindre enn 30 meter
                </Button>
                
                <Button 
                    mode="contained"
                    onPress={onPress}
                    style={styles.buttonStyle}
                    >Mer enn 30 meter
                </Button>
               
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    headline: {
        textAlign:'center', 
        padding:20
    },

    container: {
        flexDirection: "column",
        flexWrap: "nowrap",
    },

    section: {
        flex:1,
        justifyContent:'space-between'     
    },

    buttonStyle: {
        width: '60%',
        alignSelf:'center',
        marginBottom:'10%'
    }
})
