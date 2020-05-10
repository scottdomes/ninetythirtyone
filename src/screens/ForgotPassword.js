import React from 'react';
import Form from '../forms/Form';
import { validateContent, validateLength } from '../forms/validation';
import * as firebase from 'firebase';

const EmailEntry = ({ navigation }) => {
  return (
    <Form
      action={(email) => firebase.auth().sendPasswordResetEmail(email)}
      afterSubmit={() => navigation.navigate('Login')}
      buttonText="Submit"
      fields={{
        email: {
          label: 'Email',
          validators: [validateContent],
          inputProps: {
            keyboardType: 'email-address',
          },
        },
      }}
    />
  );
};

export default EmailEntry;
