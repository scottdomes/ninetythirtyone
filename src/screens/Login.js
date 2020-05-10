import React from 'react';
import { Text, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import * as Facebook from 'expo-facebook';
import * as firebase from 'firebase';

export default class Login extends React.Component {
  componentDidMount() {
    Facebook.initializeAsync('540806593492811');
  }

  async loginWithFacebook() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      '540806593492811',
      { permissions: ['public_profile'] }
    );

    if (type === 'success' && token) {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      await firebase.auth().signInWithCredential(credential);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.loginWithFacebook}>
          <Text>Hello</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
});
