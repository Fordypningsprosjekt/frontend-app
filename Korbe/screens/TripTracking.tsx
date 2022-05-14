import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, Button, Headline, Modal } from 'react-native-paper';
import HomeTripScreen from './HomeTripScreen';
import TrackingMap from './TrackingMap';

export default function TripTracking() {
    const navigation = useNavigation();
    
    const [modalVisbile, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const HomeRoute =()=> <HomeTripScreen />
    const MapRoute =()=> <TrackingMap />
    const OverviewRoute =()=> <Text>Antall registrert</Text>
    const EndTripRoute =()=> 
    <>
    <Headline style={styles.headline}>
        Ønsker du å avslutte?
    </Headline> 
    <Button
    mode="contained"
    onPress={
        ()=>navigation.navigate('Hjem')
    }
    style={styles.buttonStyle}
    >
    Avslutt tur   
    </Button>
    </>
    
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Hjem', icon: 'home-outline' },
    { key: 'map', title: 'Kart og GPS', icon: 'map' },
    { key: 'overview', title: 'Antall registrert', icon: 'format-list-bulleted' },
    {key: 'end', title: 'Avslutt tur', icon: 'close'}
    ])

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        map: MapRoute,
        overview: OverviewRoute,
        end: EndTripRoute,
      });

    return(
        <BottomNavigation
        onTabPress={showModal}
        navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
        />
        
    )
}

const styles = StyleSheet.create({
    textStyle: {
        color: 'white',
    },
    headline: {
        textAlign:'center', 
        padding:20
    },
    buttonStyle: {
        width: '60%',
        alignSelf:'center',
        marginTop:'30%'
    }
})