import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GoalCheckmark from './GoalCheckmark';

const GoalDisplay = ({ goal, toggleCompletion }) => {
  return (
    <View style={styles.goal}>
      <GoalCheckmark
        isComplete={goal.complete}
        toggleCompletion={toggleCompletion}
      />
      <Text style={styles.name}>{goal.name}</Text>
    </View>
  );
};

export default GoalDisplay;

const styles = StyleSheet.create({
  goal: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  name: {
    marginLeft: 10,
  },
});
