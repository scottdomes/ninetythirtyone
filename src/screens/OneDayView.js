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

class OneDayView extends React.Component {
  static contextType = GoalContext;
  render() {
    const goalFields = {};
    this.context.one.forEach((goal, i) => {
      goalFields[i] = {
        label: '',
        defaultValue: goal.complete ? '' : `${goal.name}`,
        validators: [validateContent],
        icon: (
          <GoalCheckmark
            isComplete={goal.complete}
            toggleCompletion={() => {}}
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
              ninety,
              thirty,
              one: {
                0: { name: goal1, complete: false },
                1: { name: goal2, complete: false },
                2: { name: goal3, complete: false },
              },
            };
            return firebase
              .database()
              .ref(`/users/${userId}/${getTodaysDate()}`)
              .set(finalGoals);
          }}
          afterSubmit={(goalObject) => {
            navigation.navigate('DayView');
          }}
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
