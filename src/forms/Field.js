import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import { GRADIENT_COLORS, GRADIENT_ORIENTATIONS } from './constants';
import AnimatedGradient from './AnimatedGradient';

export default class Field extends React.Component {
  position = new Animated.Value(0);

  shiftPosition(distance) {
    const duration = 50;
    return Animated.timing(this.position, {
      toValue: distance,
      duration,
      useNativeDriver: true,
    });
  }

  startShake = () => {
    const distance = 8;

    Animated.sequence([
      this.shiftPosition(distance),
      this.shiftPosition(-distance),
      this.shiftPosition(distance),
      this.shiftPosition(-distance),
      this.shiftPosition(distance),
      this.shiftPosition(0),
    ]).start();
  };

  shake() {
    setTimeout(this.startShake, 100);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.isSubmitting &&
      !this.props.isSubmitting &&
      this.props.error
    ) {
      this.shake();
    }
  }

  render() {
    const {
      fieldName,
      field,
      value,
      onChangeText,
      error,
      isSubmitting,
    } = this.props;
    return (
      <Animated.View
        style={{
          ...styles.inputContainer,
          transform: [
            {
              translateX: this.position,
            },
          ],
          opacity: field.complete ? 0.5 : 1,
        }}>
          <Text>{field.label}</Text>
          <AnimatedGradient
            orientation={
              isSubmitting || field.complete
                ? GRADIENT_ORIENTATIONS[1]
                : GRADIENT_ORIENTATIONS[0]
            }
            colors={GRADIENT_COLORS}
            style={styles.inputGradient}>
            <TextInput
              style={styles.input}
              {...field.inputProps}
              value={value}
              onChangeText={(text) => onChangeText(fieldName, text)}
            />
            {field.icon ? field.icon : null}
          </AnimatedGradient>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.error}>{error}</Text>
          </View>
      </Animated.View>
    );
  }
}

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
  error: { textAlign: 'center', height: 17.5 },
});
