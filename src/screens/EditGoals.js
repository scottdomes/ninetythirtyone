import React from 'react';
import EditCategoryView from '../components/EditCategoryView';

const NinetyDayView = ({ navigation }) => {
  return (
    <EditCategoryView
      navigation={navigation}
      category="ninety"
      headerText="Goals for the next 90 days"
    />
  );
};

export default NinetyDayView;
