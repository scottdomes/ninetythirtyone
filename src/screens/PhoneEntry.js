import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from '../forms/Form';
import { validateContent, validateLength } from '../forms/validation';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

export default function PhoneEntry({ navigation }) {
  const recaptchaVerifier = React.useRef(null);
  let verifi
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;
  firebase.auth().settings.isAppVerificationDisabledForTesting = true;

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Form
        action={async (phoneNumber) => {
          // The FirebaseRecaptchaVerifierModal ref implements the
          // FirebaseAuthApplicationVerifier interface and can be
          // passed directly to `verifyPhoneNumber`.
          const phoneProvider = new firebase.auth.PhoneAuthProvider();
          const verificationIdentifier = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
          );
          return Promise.resolve(verificationIdentifier);
        }}
        afterSubmit={(verificationId) =>
          navigation.navigate('VerificationEntry', {
            verificationId,
          })
        }
        buttonText="Submit"
        fields={{
          phone: {
            label: 'Phone Number',
            validators: [validateContent, validateLength],
            inputProps: {
              keyboardType: 'phone-pad',
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
