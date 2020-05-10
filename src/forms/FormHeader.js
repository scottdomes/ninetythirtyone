import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FormHeader = ({ errorMessage, headerText }) => {
  return (
    <View style={{  }}>
      <Text style={styles.error}>{errorMessage || headerText}</Text>
    </View>
  );
};

export default FormHeader;

const styles = StyleSheet.create({
  error: {
    marginBottom: 20,
    fontSize: 18
  },
});
