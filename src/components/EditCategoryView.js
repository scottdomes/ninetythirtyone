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
import Form from '../forms/contextual/ContextForm';
import ContextFormButton from '../forms/contextual/ContextFormButton';
import ContextField from '../forms/contextual/ContextField';

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
    const { category, navigation, goals } = this.props;
    const fields = {
      goal1: goals ? goals[0] : {},
      goal2: goals ? goals[1] : {},
      goal3: goals ? goals[2] : {},
    };

    console.log(fields, goals);

    return (
      <View style={styles.container}>
        <View styles={styles.formContainer}>
          <Form
            headerText={this.props.headerText}
            action={async (values) => {
              const user = await firebase.auth().currentUser;
              const userId = user.uid;

              const promises = Object.keys(values).map((key) => {
                return firebase
                  .database()
                  .ref(`/users/${userId}/goals/${key}/`)
                  .update({ name: values[key] });
              });

              return promises;
            }}
            afterSubmit={() =>
              navigation.navigate('Main', { screen: getNextScreen(category) })
            }
            buttonText="Commit"
            fields={goals.map((goal) => (
              <ContextField
                key={goal.id}
                startingValue={goal.name}
                id={goal.id}
              />
            ))}
            renderButton={() => <ContextFormButton title="Commit" />}
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
