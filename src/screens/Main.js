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
import GoalManager from '../components/GoalManager';

const Tab = createBottomTabNavigator();

export default class MainView extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    userId: null,
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
    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user && this.state.userId !== user.uid) {
        this.setState({ userId: user.uid });
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  componentWillUnmount() {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
  }

  render() {
    return (
      <GoalManager userId={this.state.userId}>
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
        <Tab.Navigator cardStyle={{ backgroundColor: 'white' }} activeBackgroundColor="white">
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
      </GoalManager>
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
});
