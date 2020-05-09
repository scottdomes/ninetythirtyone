import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { getTodaysDate } from '../utils/date';

import * as firebase from 'firebase';

export default class DayView extends React.Component {
  state = { loaded: false, goals: [] };
  componentDidMount() {
    this.checkForUser();
  }

  checkForUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.checkForTodaysData(user.uid);
      } else {
        this.props.navigation.navigate('PhoneEntry');
      }
    });
  }

  checkForTodaysData(userId) {
    const date = getTodaysDate();
    console.log(userId, date);
    firebase
      .database()
      .ref(`/users/${userId}/${date}`)
      .on('value', (data) => {
        const goals = data.val();

        if (goals) {
          this.setState({ loaded: true, goals });
        } else {
          this.props.navigation.navigate('NinetyDayEntry');
        }
      });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#3F5EFB" />
        </View>
      );
    }

    const ninetyDayGoals = this.state.goals.ninety;
    return (
      <View>
        {this.state.goals.ninety.map((goal) => {
          return <Text key={goal}>{goal}</Text>;
        })}
        {this.state.goals.thirty.map((goal) => {
          return <Text key={goal}>{goal}</Text>;
        })}
        <Text>{this.state.goals.one}</Text>
        <TouchableWithoutFeedback
          onPressIn={() => this.props.navigation.navigate('NinetyDayEntry')}>
          <Text>Edit</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPressIn={() => firebase.auth().signOut()}>
          <Text>Logout</Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  activityIndicatorContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
});
