import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initialize } from './src/utils/firebase';
import PhoneEntry from './src/screens/PhoneEntry';
import VerificationEntry from './src/screens/VerificationEntry';
import DayView from './src/screens/DayView';

import NinetyDayEntry from './src/screens/wizard/NinetyDayEntry';
import ThirtyDayEntry from './src/screens/wizard/ThirtyDayEntry';
import OneDayEntry from './src/screens/wizard/OneDayEntry';

import Main from './src/screens/Main';

initialize();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="none">
        <Stack.Screen name="PhoneEntry" component={PhoneEntry} />
        <Stack.Screen name="VerificationEntry" component={VerificationEntry} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="NinetyDayEntry" component={NinetyDayEntry} />
        <Stack.Screen name="ThirtyDayEntry" component={ThirtyDayEntry} />
        <Stack.Screen name="OneDayEntry" component={OneDayEntry} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
