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
import GoalCheckmark from '../components/GoalCheckmark';
import Form from '../forms/Form';
import { validateContent } from '../forms/validation';
import * as firebase from 'firebase';
import { getTodaysDate } from '../utils/date';
import { Ionicons } from '@expo/vector-icons';
import WhiteBackgroundLogo from '../logos/WhiteBackgroundLogo';
import GoalField from '../forms/GoalField';

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
    const goalFields = {};

    this.context[this.props.category].forEach((goal, i) => {
      goalFields[i] = {
        label: '',
        defaultValue: goal.name,
        complete: goal.complete,
        icon: (
          <GoalCheckmark
            isComplete={goal.complete}
            toggleCompletion={() =>
              this.toggleCompletion(this.props.category, i, goal)
            }
          />
        ),
      };
    });

    const { category } = this.props;

    return (
      <View style={styles.container} behavior="padding" enabled>
        <View styles={styles.formContainer}></View>
        {this.context[category].map((goal, i) => {
          return (
            <GoalField
              key={`${category}${i}`}
              isComplete={goal.complete}
              value={goal.name}
              icon={
                <GoalCheckmark
                  isComplete={goal.complete}
                  toggleCompletion={() =>
                    this.toggleCompletion(category, i, goal)
                  }
                />
              }
            />
          );
        })}
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
  formContainer: { flex: 2 },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  logo: {
    marginBottom: 10,
  },
});
