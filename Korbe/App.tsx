/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type {Node} from 'react';
 
 import {
   useColorScheme,
 } from 'react-native';
 
 import {
   Colors,
 } from 'react-native/Libraries/NewAppScreen';
 import {Provider as PaperProvider} from 'react-native-paper';
 import StartPage from './screens/StartPage/StartPage';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import Login from './screens/Login/Login';
 
 const Stack = createNativeStackNavigator();
 
 const App: () => Node = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   // const backgroundStyle = {
   //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   // };
 
   return (
     <NavigationContainer>
     <PaperProvider>
       <Stack.Navigator initialRouteName="StartPage" >
       <Stack.Screen name="Start page" component={StartPage} />
       <Stack.Screen name="Login" component={Login} /></Stack.Navigator>
     </PaperProvider></NavigationContainer>
   );
 };
 
 
 
 export default App;
 