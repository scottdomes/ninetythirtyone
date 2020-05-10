import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import { getTodaysDate } from '../utils/date';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import { scheduleMorningNotification } from '../utils/notify';
import * as firebase from 'firebase';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OneDayView from './OneDayView';
import ThirtyDayView from './ThirtyDayView';
import NinetyDayView from './NinetyDayView';
import KeyboardListener from '../components/KeyboardListener';
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
        this.props.navigation.navigate('Login');
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

  createAllNewGoals() {
    firebase
      .database()
      .ref(`/users/${this.userId}/${getTodaysDate()}`)
      .set({
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
      });
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
      .ref(`/users/${this.userId}/${getTodaysDate()}`)
      .set(goals);
  }

  checkForTodaysData() {
    firebase
      .database()
      .ref(`/users/${this.userId}/`)
      .limitToLast(1)
      .on('value', (data) => {
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
        <View style={styles.settings}>
          <KeyboardListener>
            {(keyboardShown) => {
              return (
                <TouchableWithoutFeedback
                  onPressIn={() => this.props.navigation.navigate('Settings')}>
                  <Ionicons
                    name="ios-settings"
                    size={25}
                    color="#5c7080"
                    style={keyboardShown ? { opacity: 0 } : {}}
                  />
                </TouchableWithoutFeedback>
              );
            }}
          </KeyboardListener>
        </View>
        <Tab.Navigator>
          <Tab.Screen
            name="Ninety"
            component={NinetyDayView}
            options={{
              tabBarLabel: 'MACRO',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-compass" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Thirty"
            component={ThirtyDayView}
            options={{
              tabBarLabel: 'MEZZO',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="ios-rocket" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="One"
            component={OneDayView}
            options={{
              tabBarLabel: 'MICRO',
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
  settings: {
    position: 'absolute',
    top: '6%',
    zIndex: 5,
    right: '5%',
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
