import React from 'react';
import EditCategoryView from '../components/EditCategoryView';

const EditGoals = ({ navigation, route }) => {
  const { category } = route.params;

  return (
    <EditCategoryView
      navigation={navigation}
      category={category}
      headerText="Goals for the next 90 days"
    />
  );
};

export default EditGoals;
