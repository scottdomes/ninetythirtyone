import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import SubmittingIndicator from '../SubmittingIndicator';

export const FormContext = React.createContext('form');

const Form = ({ fields, buttonText, action, afterSubmit, renderButton }) => {
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const submit = async () => {
    setSubmitting(true);
    setErrorMessage('');
    Keyboard.dismiss();
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const context = {
    isSubmitting,
    submit,
  };

  return (
    <FormContext.Provider value={context}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text>{errorMessage}</Text>
        </View>
        <Animated.View style={{ opacity }}>
          <SubmittingIndicator isSubmitting={isSubmitting} />
          <Text>{isSubmitting ? 'SubmittingIndicator' : 'nay'}</Text>
        </Animated.View>
        <View style={styles.buttonContainer}>{renderButton()}</View>
      </KeyboardAvoidingView>
    </FormContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  childrenContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15,
  },
});

export default Form;
