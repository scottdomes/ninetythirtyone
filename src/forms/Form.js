import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { validateFields, hasValidationError } from '../forms/validation';
import Field from './Field';
import SubmitButton from './SubmitButton';
import FormHeader from './FormHeader';
import SubmittingIndicator from './SubmittingIndicator';

const getInitialValues = (fields) => {
  const fieldKeys = Object.keys(fields);
  const state = {};
  fieldKeys.forEach((key) => {
    if (fields[key].defaultValue) {
      state[key] = fields[key].defaultValue;
    } else {
      state[key] = '';
    }
  });

  return state;
};

const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });

  return state;
};

const animationTimeout = () =>
  new Promise((resolve) => setTimeout(resolve, 700));

const Form = ({
  fields,
  buttonText,
  action,
  afterSubmit,
  disableSubmitUntilChange,
  disabledbuttonText,
  headerText,
  children,
  renderHeader,
}) => {
  const fieldKeys = Object.keys(fields);
  const [values, setValues] = useState(getInitialValues(fields));
  const [hasChanged, setHasChanged] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState(
    getInitialState(fieldKeys)
  );
  const [opacity] = useState(new Animated.Value(1));
  const [isSubmitting, setSubmitting] = useState(false);

  const onChangeValue = (key, value) => {
    const newState = { ...values, [key]: value };
    setValues(newState);
    setHasChanged(true);

    if (validationErrors[key]) {
      const newErrors = { ...validationErrors, [key]: '' };
      setValidationErrors(newErrors);
    }
  };

  const getValues = () => {
    return fieldKeys.sort().map((key) => values[key]);
  };

  const fadeOut = () =>
    Animated.timing(opacity, { toValue: 0.2, duration: 200 }).start();

  const fadeIn = () =>
    Animated.timing(opacity, { toValue: 1, duration: 200 }).start();

  const submit = async () => {
    setSubmitting(true);
    setErrorMessage('');
    Keyboard.dismiss();
    setValidationErrors(getInitialState(fieldKeys));

    const errors = validateFields(fields, values);
    fadeOut();
    if (hasValidationError(errors)) {
      await animationTimeout();
      fadeIn();
      setValidationErrors(errors);
      return setSubmitting(false);
    }

    try {
      const [result] = await Promise.all([
        action(...getValues()),
        animationTimeout(),
      ]);
      await afterSubmit(result);
      fadeIn();
      setSubmitting(false);
      setHasChanged(false);
    } catch (e) {
      setErrorMessage(e.message);
      setSubmitting(false);
      fadeIn();
    }
  };

  const isButtonDisabled = disableSubmitUntilChange && !hasChanged;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      {renderHeader ? renderHeader() : null}
      <View style={{ height: 50 }}>
        <FormHeader errorMessage={errorMessage} headerText={headerText} />
      </View>
      <Animated.View style={{ opacity }}>
        <SubmittingIndicator isSubmitting={isSubmitting} />
        {fieldKeys.map((key, i) => {
          return (
            <Field
              isSubmitting={isSubmitting}
              key={key}
              fieldName={key}
              field={fields[key]}
              error={validationErrors[key]}
              onChangeText={onChangeValue}
              value={values[key]}
            />
          );
        })}
      </Animated.View>
      <View style={{ flex: 1 }}>
        <SubmitButton
          title={
            disabledbuttonText && isButtonDisabled
              ? disabledbuttonText
              : buttonText
          }
          onPress={submit}
          isSubmitting={isSubmitting}
          disabled={isButtonDisabled}
        />
        <View style={styles.childrenContainer}>{children}</View>
      </View>
    </KeyboardAvoidingView>
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
