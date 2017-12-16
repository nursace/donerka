import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import LanguageForm from './components/LanguageForm'
import RegistrationForm from './components/RegistrationForm'
import ChoosingRoleForm from './components/ChoosingRoleForm'
import UrgentSearch from './components/UrgentSearch'
class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene hideNavBar={true} key='root'>
        <Scene key='login' component={LoginForm} />
        <Scene key='register' component={RegistrationForm} />
        <Scene key='choosingRoleForm' initial component={ChoosingRoleForm} />
        <Scene key='urgentSearch' component= {UrgentSearch} />
          <Scene key='lang'  component={LanguageForm} />
        </Scene>
      </Router>
    )
  }
}

export default connect(null, { })(RouterComponent)
