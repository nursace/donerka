import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class LanguageForm extends Component {
  render() {
    return (
      <View style={styles.mainView}>
        <Text style={styles.text}>Hello World!</Text>
      </View>
    )
  }
}

const styles = {
  mainView: {
    flex: 1,
    alignContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  }
}

export default LanguageForm


