import * as React from 'react';
import { View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/splash';
import Form from './src/forms';

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

function replace(name, params) {
  navigationRef.current && navigationRef.current.replace(name, params);
}

const RootStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen options={{headerShown: false}} name="Splash" component={Splash} />
        <RootStack.Screen options={{headerShown: false}} name="Form" component={Form} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}