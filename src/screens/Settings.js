import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import SubmitButton from '../forms/SubmitButton';
import * as firebase from 'firebase';

const Settings = () => {
  return (
    <View style={styles.container}>
      <SubmitButton
        title="Log out"
        onPress={() => firebase.auth().signOut()}
        isSubmitting={false}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 15,
  },
});
