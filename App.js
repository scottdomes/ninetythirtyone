import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initialize } from './src/utils/firebase';
import PhoneEntry from './src/screens/PhoneEntry';
import VerificationEntry from './src/screens/VerificationEntry';
import DayView from './src/screens/DayView';

initialize();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DayView">
        <Stack.Screen name="PhoneEntry" component={PhoneEntry} />
        <Stack.Screen name="VerificationEntry" component={VerificationEntry} />
        <Stack.Screen name="DayView" component={DayView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
