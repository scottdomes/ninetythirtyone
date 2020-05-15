import React from 'react';
import CategoryView from '../components/CategoryView';

const NinetyDayView = ({ navigation }) => {
  return (
    <CategoryView
      navigation={navigation}
      category="ninety"
      headerText="Goals for the next 90 days"
    />
  );
};

export default NinetyDayView;
