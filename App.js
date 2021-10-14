/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LandingScreen } from './src/pages/landing/Landing';
import { LoginScreen } from './src/pages/auth/Login';
import { RegisterScreen } from './src/pages/auth/Register';
import { ConfirmScreen } from './src/pages/auth/Confirm';
import { TabsScreen } from './src/pages/tabs/Tabs';

import Amplify from 'aws-amplify';
import awsConfig from '././aws-exports';

Amplify.configure(awsConfig);

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tabs">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="Tabs" options={{ headerShown: false }} component={TabsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;