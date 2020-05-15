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
import EditGoals from './src/screens/EditGoals';

initialize();

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" headerMode="screen">
        <Stack.Screen
          name="PhoneEntry"
          component={PhoneEntry}
          options={{
            headerTitle: 'Phone sign in',
          }}
        />
        <Stack.Screen
          name="VerificationEntry"
          component={VerificationEntry}
          options={{
            headerTitle: 'Code entry',
          }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditGoals"
          component={EditGoals}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EmailEntry"
          component={EmailEntry}
          options={{
            headerTitle: 'Email sign in',
          }}
        />
        <Stack.Screen
          name="EmailSignUp"
          component={EmailSignUp}
          options={{
            headerTitle: 'Email sign up',
          }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: 'Forgot password',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
