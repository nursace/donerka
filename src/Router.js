import React, { Component } from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LanguageForm from './components/LanguageForm'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import ChoosingRoleForm from './components/ChoosingRoleForm'
import UrgentSearch from './components/UrgentSearch'
import FillingDoner from './components/FillingDoner'
import CandidatesRec from './components/CandidatesRec'
import WaitingRoom from './components/WaitingRoom'
import firebase from 'firebase'
import StartingComponent from './components/StartingComponent'
import FirstMain from './components/FirstMain'
import SecondMain from './components/SecondMain'
import ThirdMain from './components/ThirdMain'
class RouterComponent extends Component {
  render() {    
    return (
      <Router>
        <Scene key='root' hideNavBar={true}>
        <Scene key='login'  component={LoginForm} />
        <Scene key='register' component={RegistrationForm} />
        <Scene key='choosingRoleForm' component={ChoosingRoleForm} />
        <Scene key='urgentSearch'  component= {UrgentSearch} />
        <Scene key='lang' component={LanguageForm} />
        <Scene key='fillingDoner' component= {FillingDoner} />
        <Scene key='candidatesRec'   component= {CandidatesRec} />
        <Scene key='waiting' component = {WaitingRoom} />
        <Scene key='start' initial component = {StartingComponent} /> 
      <Scene key='firstMain' component = {FirstMain} />
      <Scene key='secondMain' initial component = {SecondMain} />
      <Scene key='thirdMain' component = {ThirdMain} />
        </Scene>
      </Router>
    )
  }
}

export default RouterComponent
