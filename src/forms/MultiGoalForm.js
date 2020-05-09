import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Form from './Form';
import { validateContent } from './validation';

const MultiGoalForm = ({ afterSubmit, previousGoals }) => {
  const goalFields = {};
  previousGoals.forEach((goal, i) => {
    goalFields[i] = {
      label: '',
      defaultValue: `${goal}`,
      validators: [validateContent],
    };
  });

  return (
    <View style={styles.container}>
      <Form
        action={(goal1, goal2, goal3) =>
          Promise.resolve({
            0: { name: goal1, complete: false },
            1: { name: goal2, complete: false },
            2: { name: goal3, complete: false },
          })
        }
        afterSubmit={afterSubmit}
        buttonText="Commit"
        fields={goalFields}
      />
    </View>
  );
};

export default MultiGoalForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
});
