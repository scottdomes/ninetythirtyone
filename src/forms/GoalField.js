import React from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { GRADIENT_COLORS, GRADIENT_ORIENTATIONS } from './constants';
import AnimatedGradient from './AnimatedGradient';

export default class GoalField extends React.Component {
  constructor(props) {
    super(props);
    this.field = React.createRef();
    this.state = {
      isEditing: false,
    };
  }

  handleEdit = () => {
    this.setState({ isEditing: true }, () => {
      this.field.focus();
    });
  };

  render() {
    const { value, onChangeText, icon, isComplete } = this.props;
    console.log(this.state.isEditing);
    return (
      <Animated.View
        style={{
          ...styles.inputContainer,
          opacity: isComplete ? 0.5 : 1,
        }}>
        {this.state.isEditing ? (
          <AnimatedGradient
            orientation={GRADIENT_ORIENTATIONS[0]}
            colors={GRADIENT_COLORS}
            style={styles.inputGradient}>
            <TextInput
              ref={this.field}
              style={styles.input}
              value={value}
              onChangeText={onChangeText}
            />
          </AnimatedGradient>
        ) : (
          <AnimatedGradient
            orientation={GRADIENT_ORIENTATIONS[0]}
            colors={GRADIENT_COLORS}
            style={styles.inputGradient}>
            <TouchableWithoutFeedback onPress={this.handleEdit}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>{value}</Text>
                {icon}
              </View>
            </TouchableWithoutFeedback>
          </AnimatedGradient>
        )}
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
    width: 346,
    textAlign: 'center',
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  text: {
    width: 300,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    height: 40,
    lineHeight: 40,
  },
  textWrapper: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
