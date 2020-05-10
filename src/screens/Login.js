import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import SubmitButton from '../forms/SubmitButton';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <SubmitButton
        title="Log in with your phone"
        onPress={() => navigation.navigate('PhoneEntry')}
        isSubmitting={false}
      />
      <SubmitButton
        title="Log in with email"
        onPress={() => navigation.navigate('EmailEntry')}
        isSubmitting={false}
      />
      <SubmitButton
        title="Sign up with email"
        onPress={() => navigation.navigate('EmailSignUp')}
        isSubmitting={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
