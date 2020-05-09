import React from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoalCheckmark = ({ isComplete, toggleCompletion }) => {
  return (
    <TouchableWithoutFeedback onPress={toggleCompletion}>
      <Ionicons
        style={styles.container}
        name={isComplete ? "ios-checkmark-circle" :"ios-checkmark-circle-outline"}
        size={32}
        color="white"
      />
    </TouchableWithoutFeedback>
  );
};

export default GoalCheckmark;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 7,
    marginLeft: 10
  },
});
