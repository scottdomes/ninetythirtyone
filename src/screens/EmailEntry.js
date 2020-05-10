import React from 'react';
import Form from '../forms/Form';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { validateContent, validateLength } from '../forms/validation';
import * as firebase from 'firebase';

const EmailEntry = ({ navigation }) => {
  return (
      <Form
        action={(email, password) =>
          firebase.auth().signInWithEmailAndPassword(email, password)
        }
        afterSubmit={() => navigation.navigate('Main')}
        buttonText="Submit"
        fields={{
          email: {
            label: 'Email',
            validators: [validateContent],
            inputProps: {
              keyboardType: 'email-address',
            },
          },
          password: {
            label: 'Password',
            validators: [validateContent, validateLength],
            inputProps: {
              secureTextEntry: true,
            },
          },
        }}>
        <View style={styles.linkContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text>Forgot password?</Text>
          </TouchableWithoutFeedback>
        </View>
      </Form>
  );
};

export default EmailEntry;

const styles = StyleSheet.create({
  linkContainer: {
    marginBottom: 60,
  },
});
