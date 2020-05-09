import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class DayView extends React.Component {
  componentDidMount() {
    console.log('mount');
  }

  render() {
    return (
      <View>
        <Text>Did it!</Text>
      </View>
    );
  }
}
