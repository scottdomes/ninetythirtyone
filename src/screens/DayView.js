import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import * as firebase from 'firebase';

export default class DayView extends React.Component {
  state = { loaded: false };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loaded: true });
      } else {
        this.props.navigation.navigate('PhoneEntry');
      }
    });
  }

  render() {
    return (
      <View>
        <Text>Did it!</Text>
        <TouchableWithoutFeedback onPressIn={() => firebase.auth().signOut()}>
          <Text>Logout</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
