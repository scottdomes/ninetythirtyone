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

export default class NinetyDayView extends React.Component {
  state = { loaded: false, goals: [] };
  componentDidMount() {
    this.loadPreviousGoals();
  }

  async loadPreviousGoals() {
    const user = await firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/users/${user.uid}/`)
      .limitToLast(1)
      .on('value', (data) => {
        const goalObject = data.val();
        console.log(goalObject);
        const lastDateKey = Object.keys(goalObject)[0];
        const goals = goalObject[lastDateKey].ninety;
        this.setState({ loaded: true, goals });
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
    const { navigation } = this.props;
    const goalFields = {};
    this.state.goals.forEach((goal, i) => {
      goalFields[i] = {
        label: '',
        defaultValue: `${goal}`,
        validators: [validateContent],
      };
    });

    return (
      <View style={styles.container}>
        <Form
          action={(goal1, goal2, goal3) =>
            Promise.resolve({ 0: goal1, 1: goal2, 2: goal3 })
          }
          afterSubmit={(goalObject) => {
            navigation.navigate('ThirtyDayEntry', {
              ninety: goalObject,
            });
          }}
          buttonText="Commit"
          fields={goalFields}
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
