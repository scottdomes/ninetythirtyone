import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initialize } from './src/utils/firebase';
import PhoneEntry from './src/screens/PhoneEntry';
import VerificationEntry from './src/screens/VerificationEntry';

import Main from './src/screens/Main';
import Settings from './src/screens/Settings';

initialize();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="screen">
        <Stack.Screen name="PhoneEntry" component={PhoneEntry} />
        <Stack.Screen name="VerificationEntry" component={VerificationEntry} />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
