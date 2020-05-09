import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GoalCheckmark = ({ isComplete, toggleCompletion }) => {
  return (
    <TouchableWithoutFeedback onPress={toggleCompletion}>
      <Ionicons
        name="md-checkmark-circle"
        size={32}
        color={isComplete ? 'green' : 'black'}
      />
    </TouchableWithoutFeedback>
  );
};

export default GoalCheckmark;
