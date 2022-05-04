/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import type { Node } from 'react';
import { useColorScheme, View, Text } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import StartPage from './screens/StartPage/StartPage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login/Login';
import CreateAccount from './screens/CreateAccount/CreateAccount';
import HomeScreen from './screens/Home/HomeScreen';
import NewTrip from './screens/NewTrip/NewTrip';
import TripTracking from './screens/TripTracking';
import ScreenMap from './screens/ScreenMap';
import SavedMaps from './screens/SavedMaps';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Map from './screens/Map';
import DownloadedMap from './screens/DownloadedMap';
import RegisterSheep from './screens/Registration/RegisterSheep';


const Stack = createNativeStackNavigator();

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    useEffect(()=> {
        const subscriber = auth().onAuthStateChanged(userState => {
            setUser(userState);

            if(loading) {
                setLoading(false);
            }
        })
        return subscriber;
    }, []);

    // check if the current user is logged in
    user ? console.log(user.uid) : console.log('Not logged in'); 

    return (
        <PaperProvider>
            <NavigationContainer>
            <Stack.Navigator initialRouteName="StartPage">
                <Stack.Screen name="Startside" component={StartPage} />
                <Stack.Screen name="Innlogging" component={Login} />
                <Stack.Screen
                    name="Opprett bruker"
                    component={CreateAccount}
                />
                <Stack.Screen name="Hjem" component={HomeScreen}/>
                <Stack.Screen name='Ny oppsynstur' component={NewTrip}/>
                <Stack.Screen name='Aktiv oppsynstur' component={TripTracking} />
                <Stack.Screen name='Last ned kart' component={Map} />
                <Stack.Screen name='Nedlastet kart' component={ScreenMap} />
                <Stack.Screen name='Velg kart' component={SavedMaps} />
                <Stack.Screen name='Bruk kartet' component={DownloadedMap} />
                <Stack.Screen name='Antall sau og lam' component={RegisterSheep} />
            </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
        
    );
};

export default App;
