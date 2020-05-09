import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from './src/forms/Form';
import { validateContent, validateLength } from './src/forms/validation';
import { initialize } from './src/utils/firebase';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase';

initialize();

export default function App() {
  const recaptchaVerifier = React.useRef(null);
  const [verificationId, setVerificationId] = React.useState();
  const firebaseConfig = firebase.apps.length
    ? firebase.app().options
    : undefined;

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
          const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier.current
          );
          setVerificationId(verificationId);
          console.log(verificationId);
          return Promise.resolve();
        }}
        afterSubmit={() => console.log('done')}
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
