import React from 'react';
import EditCategoryView from '../components/EditCategoryView';

const EditGoals = ({ navigation, route }) => {
  const { category, goals } = route.params;

  return (
    <EditCategoryView
      navigation={navigation}
      category={category}
      goals={goals}
      headerText="Goals for the next 90 days"
    />
  );
};

export default EditGoals;
