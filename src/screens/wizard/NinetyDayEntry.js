import React from 'react';
import MultiGoalForm from '../../forms/MultiGoalForm';

const NinetyDayView = ({ navigation, route }) => {
  const { previousGoals } = route.params;
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
