import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { getTodaysDate } from '../utils/date';
import * as firebase from 'firebase';
import GoalContext from '../components/GoalContext';

const defaultGoals = {
  ninety: [
    {
      name: '',
      complete: false,
    },
    {
      name: '',
      complete: false,
    },
    {
      name: '',
      complete: false,
    },
  ],
  thirty: [
    {
      name: '',
      complete: false,
    },
    {
      name: '',
      complete: false,
    },
    {
      name: '',
      complete: false,
    },
  ],
  one: [
    {
      name: '',
      complete: false,
    },
    {
      name: '',
      complete: false,
    },
    {
      name: '',
      complete: false,
    },
  ],
};

export default class GoalManager extends React.Component {
  state = {
    loaded: false,
    goals: { ...defaultGoals },
  };

  componentDidMount() {
    this.checkForTodaysData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.checkForTodaysData();
    }
  }

  componentWillUnmount() {
    if (this.props.userId) {
      firebase
        .database()
        .ref(`/users/${this.props.userId}/`)
        .limitToLast(1)
        .off('value');
    }
  }

  createAllNewGoals() {
    firebase
      .database()
      .ref(`/users/${this.props.userId}/${getTodaysDate()}`)
      .set({ ...defaultGoals });
  }

  createTodaysGoals(lastDaysGoals) {
    const goals = {
      ninety: lastDaysGoals.ninety.map((goal) => {
        if (goal.complete) {
          return {
            name: '',
            complete: false,
          };
        }
        return goal;
      }),
      thirty: lastDaysGoals.thirty.map((goal) => {
        if (goal.complete) {
          return {
            name: '',
            complete: false,
          };
        }
        return goal;
      }),
      one: lastDaysGoals.one.map((goal) => {
        if (goal.complete) {
          return {
            name: '',
            complete: false,
          };
        }
        return goal;
      }),
    };
    firebase
      .database()
      .ref(`/users/${this.props.userId}/${getTodaysDate()}`)
      .set(goals);
  }

  checkForTodaysData() {
    firebase
      .database()
      .ref(`/users/${this.props.userId}/`)
      .limitToLast(1)
      .on('value', (data) => {
        this.setState({ loaded: false });
        const goalObject = data.val();

        if (!goalObject) {
          return this.createAllNewGoals();
        }

        const dateKey = Object.keys(goalObject)[0];

        if (dateKey === getTodaysDate()) {
          this.setState({ loaded: true, goals: goalObject[dateKey] });
        } else {
          this.createTodaysGoals(goalObject[dateKey]);
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

    return (
      <GoalContext.Provider value={this.state.goals}>
        {this.props.children}
      </GoalContext.Provider>
    );
  }
}

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
    zIndex: 2,
  },
});
