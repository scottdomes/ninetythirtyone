import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from '../forms/Form';
import { validateContent } from '../forms/validation';
import * as firebase from 'firebase';

export default function VerificationEntry({ route, navigation }) {
  const { verificationId } = route.params;
  return (
    <View style={styles.container}>
      <Form
        action={async (verificationCode) => {
          const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            verificationCode
          );
          return firebase.auth().signInWithCredential(credential);
        }}
        afterSubmit={() => navigation.navigate('Main')}
        buttonText="Submit"
        fields={{
          verificationCode: {
            label: 'Verification Code',
            validators: [validateContent],
            inputProps: {
              keyboardType: 'number-pad',
            },
          },
        }}
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
