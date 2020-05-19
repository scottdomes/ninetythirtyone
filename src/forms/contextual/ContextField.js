import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { FormContext } from './ContextForm';
import AnimatedGradient from '../AnimatedGradient';
import { GRADIENT_COLORS, GRADIENT_ORIENTATIONS } from '../constants';

const ContextField = ({ startingValue }) => {
  const [value, setValue] = useState(startingValue);
  return (
    <FormContext.Consumer>
      {(formContext) => (
        <View style={styles.inputContainer}>
          <AnimatedGradient
            orientation={GRADIENT_ORIENTATIONS[0]}
            colors={GRADIENT_COLORS}
            style={styles.inputGradient}>
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={(text) => setValue(text)}
            />
          </AnimatedGradient>
        </View>
      )}
    </FormContext.Consumer>
  );
};

const styles = StyleSheet.create({
  inputGradient: {
    padding: 3,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  inputContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    marginBottom: 10,
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default ContextField;
