import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { getTodaysDate } from '../utils/date';
import { Ionicons } from '@expo/vector-icons';

import * as firebase from 'firebase';

const Icon = ({ isComplete, toggleCompletion }) => {
  return (
    <TouchableWithoutFeedback onPress={toggleCompletion}>
      <Ionicons
        name="md-checkmark-circle"
        size={32}
        color={isComplete ? 'green' : 'black'}
      />
    </TouchableWithoutFeedback>
  );
};

const GoalDisplay = ({ goal, toggleCompletion }) => {
  return (
    <View style={styles.goal}>
      <Text>{goal.name}</Text>
      <Icon isComplete={goal.complete} toggleCompletion={toggleCompletion} />
    </View>
  );
};

export default class DayView extends React.Component {
  state = { loaded: false, goals: [] };
  componentDidMount() {
    this.checkForUser();
  }

  checkForUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userId = user.uid;
        this.checkForTodaysData();
      } else {
        this.props.navigation.navigate('PhoneEntry');
      }
    });
  }

  componentWillUnmount() {
    if (this.userId) {
      firebase
        .database()
        .ref(`/users/${this.userId}/`)
        .limitToLast(1)
        .off('value');
    }
  }

  checkForTodaysData() {
    firebase
      .database()
      .ref(`/users/${this.userId}/`)
      .limitToLast(1)
      .on('value', (data) => {
        const goalObject = data.val();

        if (!goalObject) {
          return this.props.navigation.navigate('NinetyDayEntry');
        }

        const dateKey = Object.keys(goalObject)[0];

        if (dateKey === getTodaysDate()) {
          this.setState({ loaded: true, goals: goalObject[dateKey] });
        } else {
          this.props.navigation.navigate('NinetyDayEntry', {
            previousGoals: goalObject[dateKey],
          });
        }
      });
  }

  toggleCompletion(category, index, goal) {
    firebase
      .database()
      .ref(`/users/${this.userId}/${getTodaysDate()}/${category}/${index}`)
      .set({
        ...goal,
        complete: !goal.complete,
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
      <View style={styles.container}>
        {this.state.goals.ninety.map((goal, i) => {
          return (
            <GoalDisplay
              key={`90${i}`}
              goal={goal}
              toggleCompletion={() => this.toggleCompletion('ninety', i, goal)}
            />
          );
        })}
        {this.state.goals.thirty.map((goal, i) => {
          return (
            <GoalDisplay
              key={`30${i}`}
              goal={goal}
              toggleCompletion={() => this.toggleCompletion('thirty', i, goal)}
            />
          );
        })}
        {this.state.goals.one.map((goal, i) => {
          return (
            <GoalDisplay
              key={`1${i}`}
              goal={goal}
              toggleCompletion={() => this.toggleCompletion('one', i, goal)}
            />
          );
        })}
        <TouchableWithoutFeedback
          onPressIn={() =>
            this.props.navigation.navigate('NinetyDayEntry', {
              previousGoals: this.state.goals,
            })
          }>
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
    marginTop: 15,
    marginBottom: 15,
    position: 'relative',
  },
  goal: {
    marginBottom: 20,
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
