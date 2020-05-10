import React from 'react';
import Form from '../forms/Form';
import { validateContent, validateLength } from '../forms/validation';
import * as firebase from 'firebase';

const EmailEntry = ({ navigation }) => {
  return (
    <Form
      action={(email, password) =>
        firebase.auth().createUserWithEmailAndPassword(email, password)
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
      }}
    />
  );
};

export default EmailEntry;
