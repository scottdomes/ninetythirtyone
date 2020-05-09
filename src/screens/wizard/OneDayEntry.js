import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Form from '../../forms/Form';
import { validateContent } from '../../forms/validation';

import * as firebase from 'firebase';

const todaysDate = () => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const date = new Date().getDate() + 1;
  return `${year}-${month}-${date}`;
};

export default class OneDayEntry extends React.Component {
  state = { loaded: false, goal: '' };
  componentDidMount() {
    this.loadPreviousGoals();
  }

  async loadPreviousGoals() {
    const user = await firebase.auth().currentUser;
    const data = await firebase
      .database()
      .ref(`/users/${user.uid}/`)
      .limitToLast(1)
      .once('value');
    const goalObject = data.val();
    const lastDateKey = Object.keys(goalObject)[0];
    const goal = goalObject[lastDateKey].one;
    this.setState({ loaded: true, goal });
  }

  render() {
    if (!this.state.loaded) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="#3F5EFB" />
        </View>
      );
    }

    const { navigation } = this.props;
    const { ninety, thirty } = this.props.route.params;

    return (
      <View style={styles.container}>
        <Form
          action={async (goal) => {
            const user = await firebase.auth().currentUser;
            const userId = user.uid;
            const finalGoals = {
              ninety,
              thirty,
              one: goal,
            };
            return firebase
              .database()
              .ref(`/users/${userId}/${todaysDate()}`)
              .set(finalGoals);
          }}
          afterSubmit={(goalObject) => {
            navigation.navigate('DayView');
          }}
          buttonText="Commit"
          fields={{
            1: {
              label: '',
              defaultValue: `${this.state.goal}`,
              validators: [validateContent],
            },
          }}
        />
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
