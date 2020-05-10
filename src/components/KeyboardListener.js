import React, { Component } from 'react';
import { Keyboard } from 'react-native';

export default class KeyboardListener extends Component {
  state = { shown: false };
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({ shown: true });
  }

  _keyboardDidHide = () => {
    this.setState({ shown: false });
  }

  render() {
    return this.props.children(this.state.shown);
  }
}
