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

class OneDayView extends React.Component {
  static contextType = GoalContext;

  async toggleCompletion(category, index, goal) {
    const user = await firebase.auth().currentUser;

    firebase
      .database()
      .ref(`/users/${user.uid}/${getTodaysDate()}/one/${index}`)
      .set({
        ...goal,
        complete: !goal.complete,
      });
  }

  render() {
    const goalFields = {};
    this.context.one.forEach((goal, i) => {
      goalFields[i] = {
        label: '',
        defaultValue: goal.complete ? '' : `${goal.name}`,
        validators: [validateContent],
        complete: goal.complete,
        icon: (
          <GoalCheckmark
            isComplete={goal.complete}
            toggleCompletion={() => this.toggleCompletion('one', i, goal)}
          />
        ),
      };
    });
    return (
      <View style={styles.container}>
        <Form
          action={async (goal1, goal2, goal3) => {
            const user = await firebase.auth().currentUser;
            const userId = user.uid;
            const finalGoals = {
              0: { name: goal1, complete: false },
              1: { name: goal2, complete: false },
              2: { name: goal3, complete: false },
            };
            return firebase
              .database()
              .ref(`/users/${userId}/${getTodaysDate()}/one`)
              .set(finalGoals);
          }}
          afterSubmit={() => Promise.resolve()}
          buttonText="Commit"
          fields={goalFields}
        />
      </View>
    );
  }
}

export default OneDayView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
  },
});
