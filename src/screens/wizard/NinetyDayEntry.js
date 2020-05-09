import React from 'react';
import MultiGoalForm from '../../forms/MultiGoalForm';

const defaultGoals = {
  ninety: ['', '', ''],
  thirty: ['', '', ''],
  one: ['', '', ''],
};

const NinetyDayView = ({ navigation, route }) => {
  const previousGoals = route.params
    ? route.params.previousGoals
    : defaultGoals;
  return (
    <MultiGoalForm
      previousGoals={previousGoals.ninety}
      afterSubmit={(goalObject) => {
        navigation.navigate('ThirtyDayEntry', {
          ninety: goalObject,
          previousGoals,
        });
      }}
    />
  );
};

export default NinetyDayView;
