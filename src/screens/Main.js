import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { getTodaysDate } from '../utils/date';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { scheduleMorningNotification } from '../utils/notify';
import * as firebase from 'firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DayView from './DayView';
import OneDayView from './OneDayView';
import GoalContext from '../components/GoalContext';

const Tab = createBottomTabNavigator();

export default class MainView extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    loaded: false,
    goals: [
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

  componentDidMount() {
    this.checkForUser();
    this.askPermissions();
    this.scheduleMorningNotification();
  }

  scheduleMorningNotification() {
    Notifications.cancelAllScheduledNotificationsAsync();
    scheduleMorningNotification();
  }

  askPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return false;
    }
    return true;
  };

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
          return this.setState({ loaded: true });
        }

        const dateKey = Object.keys(goalObject)[0];

        if (dateKey === getTodaysDate()) {
          this.setState({ loaded: true, goals: goalObject[dateKey] });
        } else {
          const activeGoals = goalObject[dateKey].filter(
            (goal) => !goal.complete
          );
          this.setState({ loaded: true, goals: activeGoals });
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
        <Tab.Navigator>
          <Tab.Screen name="DayView" component={DayView} />
          <Tab.Screen
            name="One"
            component={OneDayView}
            options={{
              tabBarLabel: "ONE",
              tabBarIcon: ({ color, size }) => (
                <Ionicons
                  name="ios-checkmark-circle"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </GoalContext.Provider>
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
