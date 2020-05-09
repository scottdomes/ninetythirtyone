import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import Form from '../../forms/Form';
import { validateContent } from '../../forms/validation';
import { getTodaysDate } from '../../utils/date';
import * as firebase from 'firebase';

const OneDayEntry = ({ navigation, route }) => {
  const { ninety, thirty, previousGoals } = route.params;
  const goalFields = {};

  previousGoals.one.forEach((goal, i) => {
    goalFields[i] = {
      label: '',
      defaultValue: goal.complete ? '' : `${goal.name}`,
      validators: [validateContent],
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
};

export default OneDayEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'relative',
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
