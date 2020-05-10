import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
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
        validators: [validateContent],
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
      <View style={styles.container}>
        <View style={styles.logo}>
          <WhiteBackgroundLogo />
        </View>
        <View styles={styles.formContainer}>
          <Form
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
  logo: {
    flex: 1,
  },

  formContainer: {
    flex: 1
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 15,
  },
});
