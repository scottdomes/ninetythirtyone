import React from 'react';
import MultiGoalForm from '../../forms/MultiGoalForm';

const ThirtyDayEntry = ({ navigation, route }) => {
  const { previousGoals, ninety } = route.params;
  return (
    <MultiGoalForm
      previousGoals={previousGoals.thirty}
      afterSubmit={(goalObject) => {
        navigation.navigate('OneDayEntry', {
          ninety,
          thirty: goalObject,
          previousGoals,
        });
      }}
    />
  );
};

export default ThirtyDayEntry;
