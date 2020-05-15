import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { getTodaysDate } from '../utils/date';
import * as firebase from 'firebase';
import GoalContext from '../components/GoalContext';

export default class GoalManager extends React.Component {
  state = {
    loaded: false,
    goals: [],
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
      firebase
        .database()
        .ref(`/users/${this.props.userId}/goals/`)
        .off('value');
    }
  }

  listenForGoals() {
    firebase
      .database()
      .ref(`/users/${this.props.userId}/goals/`)
      .on('value', (data) => {
        const goalObject = data.val();
        if (goalObject) {
          const goals = Object.keys(goalObject).map((key) => {
            const goal = goalObject[key];
            return { ...goal, id: key };
          });
          this.setState({ loaded: true, goals });
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
