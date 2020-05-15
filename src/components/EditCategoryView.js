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
import uid from 'uid';

const getNextScreen = (category) => {
  if (category === 'ninety') {
    return 'NinetyDayView';
  }

  if (category === 'thirty') {
    return 'ThirtyDayView';
  }

  return 'OneDayView';
};

class EditCategoryView extends React.Component {
  render() {
    const { category, navigation } = this.props;
    const fields = {
      goal1: {},
      goal2: {},
      goal3: {},
    };

    return (
      <View style={styles.container} behavior="padding" enabled>
        <View styles={styles.formContainer}>
          <Form
            headerText={this.props.headerText}
            action={async (goal1, goal2, goal3) => {
              const user = await firebase.auth().currentUser;
              const userId = user.uid;
              const finalGoals = [
                { name: goal1, complete: false, category, id: uid() },
                { name: goal2, complete: false, category, id: uid() },
                { name: goal3, complete: false, category, id: uid() },
              ];
              return firebase
                .database()
                .ref(`/users/${userId}/`)
                .push(finalGoals);
            }}
            afterSubmit={() =>
              navigation.navigate('Main', { screen: getNextScreen(category) })
            }
            buttonText="Commit"
            fields={fields}
          />
        </View>
      </View>
    );
  }
}

export default EditCategoryView;

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
