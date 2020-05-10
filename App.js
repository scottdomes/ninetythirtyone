import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { initialize } from './src/utils/firebase';
import PhoneEntry from './src/screens/PhoneEntry';
import VerificationEntry from './src/screens/VerificationEntry';

import Main from './src/screens/Main';
import Settings from './src/screens/Settings';
import Login from './src/screens/Login';
import EmailEntry from './src/screens/EmailEntry';
import EmailSignUp from './src/screens/EmailSignUp';
import ForgotPassword from './src/screens/ForgotPassword';

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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmailEntry" component={EmailEntry} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
