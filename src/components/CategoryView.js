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
      console.log(goal);
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

    return (
      <View style={styles.container} behavior="padding" enabled>
        <View styles={styles.formContainer}>
          <Form
            renderHeader={() => (
              <View style={styles.header}>
                <View style={styles.logo}>
                  <WhiteBackgroundLogo />
                </View>
              </View>
            )}
            headerText={this.props.headerText}
            disableSubmitUntilChange
            disabledbuttonText="Committed!"
            action={async (goal1, goal2, goal3) => {
              const user = await firebase.auth().currentUser;
              const userId = user.uid;
              const finalGoals = {
                0: { name: goal1, complete: goalFields[0].complete },
                1: { name: goal2, complete: goalFields[1].complete },
                2: { name: goal3, complete: goalFields[2].complete },
              };
              return firebase
                .database()
                .ref(
                  `/users/${userId}/${getTodaysDate()}/${this.props.category}`
                )
                .set(finalGoals);
            }}
            afterSubmit={() => Promise.resolve()}
            buttonText="Commit"
            fields={goalFields}
          />
        </View>
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
