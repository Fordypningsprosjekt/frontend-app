import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Button, Modal } from "react-native-paper";


export default function screenMap(){
    const [modalVisbile, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const containerStyle = {backgroundColor: 'white', padding: 20};
    
    return(
        <><ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            style={styles.imageWrapper}
        >
            <Image
                source={{ uri: '/Users/mariavu/Library/Developer/CoreSimulator/Devices/2DFA97F2-A5F0-4DDA-9A4A-4D7EBA664BCA/data/Containers/Data/Application/88B517B9-7D84-40D4-BFCA-7CA9873A0B83/tmp/ReactNative/8C7B84B4-F896-4148-9343-5C8B9236F2AE.png' }}
                style={styles.imageStyle} /></ReactNativeZoomableView>
                
                <Modal visible={modalVisbile} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <Text>Lastet ned!</Text>
            </Modal>
            <Button mode='outlined' onPress={showModal}>Last ned kart</Button>
            </>
    )
}

const styles = StyleSheet.create({
    imageWrapper:{
        padding: 10,
        backgroundColor: 'white',
    },
    imageStyle:{
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    }
    
})