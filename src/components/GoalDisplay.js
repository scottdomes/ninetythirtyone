import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoalCheckmark from './GoalCheckmark';

const GoalDisplay = ({ goal, toggleCompletion }) => {
  return (
    <View style={styles.goal}>
      <Text>{goal.name}</Text>
      <GoalCheckmark
        isComplete={goal.complete}
        toggleCompletion={toggleCompletion}
      />
    </View>
  );
};

export default GoalDisplay;

const styles = StyleSheet.create({
  goal: {
    marginBottom: 20,
  },
});
