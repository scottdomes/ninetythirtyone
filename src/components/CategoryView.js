import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import GoalContext from '../components/GoalContext';
import { Link, StackActions } from '@react-navigation/native';
import GoalCheckmark from '../components/GoalCheckmark';
import Form from '../forms/Form';
import { validateContent } from '../forms/validation';
import * as firebase from 'firebase';
import { getTodaysDate } from '../utils/date';
import { Ionicons } from '@expo/vector-icons';
import WhiteBackgroundLogo from '../logos/WhiteBackgroundLogo';
import Button from './Button';

class CategoryView extends React.Component {
  static contextType = GoalContext;

  state = {
    hasChanged: false,
  };

  async toggleCompletion(category, index, goal) {
    const user = await firebase.auth().currentUser;

    firebase
      .database()
      .ref(
        `/users/${user.uid}/${getTodaysDate()}/${this.props.category}/${index}`
      )
      .set({
        ...goal,
        complete: !goal.complete,
      });
  }

  render() {
    const { category } = this.props;
    const allGoals = this.context;
    const goals = allGoals.filter(
      (goal) => !goal.complete && goal.category === category
    );
    console.log(goals);
    return (
      <View style={styles.container} behavior="padding" enabled>
        <View style={styles.header}>
          <View style={styles.logo}>
            <WhiteBackgroundLogo category={this.props.category} />
          </View>
        </View>
        {goals.length > 0 ? (
          <View>
            {goals.map((goal) => (
              <Text key={goal.id}>{goal.name}</Text>
            ))}
            <Link
              action={StackActions.push('EditGoals', {
                category,
                goals,
              })}>
              Edit goals
            </Link>
          </View>
        ) : (
          <Link
            action={StackActions.push('EditGoals', {
              category,
            })}>
            Create some goals
          </Link>
        )}
      </View>
    );
  }
}

export default CategoryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },

  logo: {
    marginBottom: 10,
  },
});
