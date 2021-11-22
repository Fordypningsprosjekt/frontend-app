import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BottomNavigation, Modal } from 'react-native-paper';
import HomeScreen from './Home/HomeScreen';

export default function TrackingMap() {
    const navigation = useNavigation();
    
    const [modalVisbile, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};

    const HomeRoute =()=> <Text>Hjem</Text>
    const MapRoute =()=> <Text>Kart</Text>
    const OverviewRoute =()=> <Text>Antall registrert</Text>
    const EndTripRoute =()=> <Modal visible={modalVisbile} onDismiss={hideModal} contentContainerStyle={containerStyle}>
    <Text>Er du sikker?</Text>
    </Modal>
    

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
    }
})