import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import SubmitButton from '../forms/SubmitButton';
import WhiteBackgroundLogo from '../logos/WhiteBackgroundLogo';

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <WhiteBackgroundLogo />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton
          title="Log in with your phone"
          onPress={() => navigation.navigate('PhoneEntry')}
          isSubmitting={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton
          title="Log in with email"
          onPress={() => navigation.navigate('EmailEntry')}
          isSubmitting={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <SubmitButton
          title="Sign up with email"
          onPress={() => navigation.navigate('EmailSignUp')}
          isSubmitting={false}
        />
      </View>
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
  buttonContainer: {
    marginBottom: 30,
  },


  logo: {
    marginBottom: 10,
  },
});
