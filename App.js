import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from './src/forms/Form';
import { validateContent, validateLength } from './src/forms/validation';
import { initialize } from './src/utils/firebase';

initialize();

export default function App() {
  return (
    <View style={styles.container}>
      <Form
        action={() => {}}
        afterSubmit={() => {}}
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
