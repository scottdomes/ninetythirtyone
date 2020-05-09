import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import GoalContext from '../components/GoalContext';
import GoalDisplay from '../components/GoalDisplay';

class OneDayView extends React.Component {
  static contextType = GoalContext;
  render() {
    return (
      <View style={styles.container}>
        {this.context.one.map((goal, i) => {
          return (
            <GoalDisplay
              key={`1${i}`}
              goal={goal}
              toggleCompletion={() => this.toggleCompletion('one', i, goal)}
            />
          );
        })}
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
