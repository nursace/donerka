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
        <Scene  key='root'>
        <Scene key='lang' hideNavBar={true} initial component={LanguageForm} />
        <Scene key='login' hideNavBar={true} component={LoginForm} />
        <Scene key='register'hideNavBar={false} component={RegistrationForm} />
        <Scene key='choosingRoleForm'hideNavBar={true} component={ChoosingRoleForm} />
        <Scene key='urgentSearch' hideNavBar={true} component= {UrgentSearch} />
        </Scene>
      </Router>
    )
  }
}

export default connect(null, { })(RouterComponent)
