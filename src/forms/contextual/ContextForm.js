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
const animationTimeout = () =>
  new Promise((resolve) => setTimeout(resolve, 700));

const Form = ({
  fields,
  buttonText,
  action,
  afterSubmit,
  renderButton,
  renderFields,
}) => {
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [values, setValues] = useState({});

  const fadeOut = () =>
    Animated.timing(opacity, { toValue: 0.2, duration: 200 }).start();

  const fadeIn = () =>
    Animated.timing(opacity, { toValue: 1, duration: 200 }).start();

  const submit = async () => {
    setSubmitting(true);
    setErrorMessage('');
    Keyboard.dismiss();
    fadeOut();

    await Promise.all([action(values), animationTimeout()]);

    setSubmitting(false);
    fadeIn();

    afterSubmit();

    return Promise.resolve();
  };

  const getValue = (id) => {
    return values[id];
  };

  const setValue = (id, value) => {
    const newValues = { ...values };
    newValues[id] = value;
    setValues(newValues);
  };

  const context = {
    isSubmitting,
    submit,
    setValue,
    getValue,
  };

  return (
    <FormContext.Provider value={context}>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View>
          <Text>{errorMessage}</Text>
        </View>
        <Animated.View style={{ opacity }}>
          <SubmittingIndicator isSubmitting={isSubmitting} />
          {fields}
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

Form.defaultProps = {
  renderFields: () => null,
  renderButton: () => null,
};

export default Form;
