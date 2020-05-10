import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const SubmittingIndicator = ({ isSubmitting }) => {
  if (!isSubmitting) {
    return null;
  }
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size="large" color="#3F5EFB" />
    </View>
  );
};

export default SubmittingIndicator;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
