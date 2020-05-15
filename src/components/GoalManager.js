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
    this.listenForGoals();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.listenForGoals();
    }
  }

  componentWillUnmount() {
    if (this.props.userId) {
      firebase.database().ref(`/users/${this.props.userId}/`).off('value');
    }
  }

  listenForGoals() {
    firebase
      .database()
      .ref(`/users/${this.props.userId}/`)
      .on('value', (data) => {
        if (data.val()) {
          const goalGroups = Object.values(data.val());
          const goalList = goalGroups.reduce((a, b) => a.concat(b), []);
          this.setState({ loaded: true, goals: goalList });
        } else {
          this.setState({ loaded: true, goals: [] });
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
