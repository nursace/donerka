import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import LanguageForm from './components/LanguageForm'

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key='root'>
          <Scene key='lang' component={LanguageForm} />
          <Scene key='login' component={LoginForm} title='Please Login'/>
        </Scene>
      </Router>
    )
  }
}

export default connect(null, { })(RouterComponent)
