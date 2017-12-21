import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginForm from './components/LoginForm'
import LanguageForm from './components/LanguageForm'
import RegistrationForm from './components/RegistrationForm'
import ChoosingRoleForm from './components/ChoosingRoleForm'
import UrgentSearch from './components/UrgentSearch'
import FillingDoner from './components/FillingDoner'
import CandidatesRec from './components/CandidatesRec'

class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Scene key='root' hideNavBar={true}>
        <Scene key='lang' initial component={LanguageForm} />
        <Scene key='login'  component={LoginForm} />
        <Scene key='register' component={RegistrationForm} />
        <Scene key='choosingRoleForm' hideNavBar={true} component={ChoosingRoleForm} />
        <Scene key='urgentSearch'  component= {UrgentSearch} />
        <Scene key='fillingDoner' component= {FillingDoner} />
        <Scene key='candidatesRec'  hideNavBar component= {CandidatesRec} />
        </Scene>
      </Router>
    )
  }
}

export default connect(null, { })(RouterComponent)
